alter table public.comments
  add column if not exists character_slug text;

alter table public.comments
  drop constraint if exists comments_character_slug_format;

alter table public.comments
  add constraint comments_character_slug_format check (
    character_slug is null
    or (
      char_length(character_slug) between 1 and 64
      and character_slug ~ '^[a-z0-9][a-z0-9-]*$'
    )
  );

comment on column public.comments.character_slug is
  '可选评论角色；留空表示匿名，值为网站人物 slug。';

grant select (character_slug) on table public.comments to anon, authenticated;

drop function if exists public.submit_comment(text, text, text);
drop function if exists public.submit_comment(text, text, text, text);

create function public.submit_comment(
  p_work_slug text,
  p_content text,
  p_rate_key text,
  p_character_slug text
)
returns table (
  comment_id uuid,
  comment_created_at timestamptz,
  comment_status text,
  comment_character_slug text
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

  if p_character_slug is not null
    and (
      char_length(p_character_slug) not between 1 and 64
      or p_character_slug !~ '^[a-z0-9][a-z0-9-]*$'
    ) then
    raise exception using errcode = '22023', message = 'invalid_character_slug';
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
  insert into public.comments (work_slug, character_slug, content)
  values (p_work_slug, p_character_slug, p_content)
  returning
    comments.id,
    comments.created_at,
    comments.status,
    comments.character_slug;
end;
$$;

revoke all on function public.submit_comment(text, text, text, text)
  from public, anon, authenticated;
grant execute on function public.submit_comment(text, text, text, text) to service_role;
