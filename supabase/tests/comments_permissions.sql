-- 在应用迁移后，以 Supabase SQL Editor 运行本文件。
-- 所有布尔结果都应为 true；public_table_privileges 应只出现 SELECT。

select
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as rls_forced
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname = 'comments';

select
  policyname,
  cmd = 'SELECT' as select_only,
  roles @> array['anon', 'authenticated']::name[] as public_roles,
  qual = '(status = ''approved''::text)' as approved_only
from pg_policies
where schemaname = 'public' and tablename = 'comments';

select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'comments'
  and grantee in ('anon', 'authenticated')
order by grantee, privilege_type;

select
  to_regprocedure('public.submit_comment(text,text,text)') is null
    as legacy_rpc_removed,
  not has_function_privilege('anon', 'public.submit_comment(text,text,text,text)', 'EXECUTE')
    as anon_cannot_submit_rpc,
  not has_function_privilege('authenticated', 'public.submit_comment(text,text,text,text)', 'EXECUTE')
    as authenticated_cannot_submit_rpc,
  has_function_privilege('service_role', 'public.submit_comment(text,text,text,text)', 'EXECUTE')
    as service_role_can_submit_rpc;
