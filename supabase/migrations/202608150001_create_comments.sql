create extension if not exists pgcrypto;

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  work_slug text not null,
  content text not null,
  created_at timestamptz not null default now(),
  status text not null default 'approved',
  constraint comments_work_slug_format check (
    char_length(work_slug) between 1 and 100
    and work_slug ~ '^[a-z0-9][a-z0-9:/-]*$'
  ),
  constraint comments_content_length check (char_length(content) between 1 and 400),
  constraint comments_plain_text_only check (
    content !~ '[<>]'
    and regexp_replace(content, E'[\\n\\t]', '', 'g') !~ '[[:cntrl:]]'
  ),
  constraint comments_status_values check (status in ('pending', 'approved', 'hidden'))
);

-- 若早期草稿曾创建过本表，也统一切换为“提交即公开”。
alter table public.comments alter column status set default 'approved';

comment on table public.comments is '匿名评论管理表；在 Supabase Table Editor 中修改 status 或删除记录。';
comment on column public.comments.id is '评论唯一编号（自动生成）';
comment on column public.comments.work_slug is '评论所属页面，例如 character:raskolnikov';
comment on column public.comments.content is '纯文本评论，最多 400 字';
comment on column public.comments.created_at is '提交时间（自动生成）';
comment on column public.comments.status is '显示状态：approved（显示）/ hidden（隐藏）；也保留 pending 供人工暂存';

create index if not exists comments_public_feed_idx
  on public.comments (work_slug, created_at desc)
  where status = 'approved';

alter table public.comments enable row level security;
alter table public.comments force row level security;

revoke all on table public.comments from public, anon, authenticated;
grant select (id, work_slug, content, created_at, status)
  on table public.comments to anon, authenticated;

drop policy if exists "public can read approved comments" on public.comments;
create policy "public can read approved comments"
  on public.comments
  for select
  to anon, authenticated
  using (status = 'approved');

-- 内部防刷表。这里只保存随机浏览器令牌的 HMAC，不保存 IP、账号或浏览器指纹。
create table if not exists public.comment_rate_limits (
  rate_key text primary key,
  window_started_at timestamptz not null default now(),
  submission_count smallint not null default 1,
  updated_at timestamptz not null default now(),
  constraint comment_rate_limits_count check (submission_count between 1 and 100)
);

alter table public.comment_rate_limits enable row level security;
alter table public.comment_rate_limits force row level security;
revoke all on table public.comment_rate_limits from public, anon, authenticated;

create or replace function public.submit_comment(
  p_work_slug text,
  p_content text,
  p_rate_key text
)
returns table (
  comment_id uuid,
  comment_created_at timestamptz,
  comment_status text
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_count smallint;
begin
  if p_work_slug is null
    or char_length(p_work_slug) not between 1 and 100
    or p_work_slug !~ '^[a-z0-9][a-z0-9:/-]*$' then
    raise exception using errcode = '22023', message = 'invalid_work_slug';
  end if;

  if p_content is null
    or char_length(p_content) not between 1 and 400
    or p_content ~ '[<>]'
    or regexp_replace(p_content, E'[\\n\\t]', '', 'g') ~ '[[:cntrl:]]' then
    raise exception using errcode = '22023', message = 'invalid_content';
  end if;

  if p_rate_key is null or char_length(p_rate_key) <> 64 then
    raise exception using errcode = '22023', message = 'invalid_rate_key';
  end if;

  insert into public.comment_rate_limits (
    rate_key,
    window_started_at,
    submission_count,
    updated_at
  ) values (
    p_rate_key,
    now(),
    1,
    now()
  )
  on conflict (rate_key) do update
  set
    window_started_at = case
      when comment_rate_limits.window_started_at <= now() - interval '10 minutes'
        then now()
      else comment_rate_limits.window_started_at
    end,
    submission_count = case
      when comment_rate_limits.window_started_at <= now() - interval '10 minutes'
        then 1
      else comment_rate_limits.submission_count + 1
    end,
    updated_at = now()
  returning submission_count into current_count;

  if current_count > 3 then
    raise exception using errcode = 'P0001', message = 'rate_limit_exceeded';
  end if;

  delete from public.comment_rate_limits
  where updated_at < now() - interval '24 hours';

  return query
  insert into public.comments (work_slug, content)
  values (p_work_slug, p_content)
  returning comments.id, comments.created_at, comments.status;
end;
$$;

revoke all on function public.submit_comment(text, text, text) from public, anon, authenticated;
grant execute on function public.submit_comment(text, text, text) to service_role;
