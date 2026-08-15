# 匿名评论：Supabase 与 Turnstile 配置

第一版不包含管理员后台。评论通过服务端接口写入 Supabase，默认 `approved` 并立即公开；日常管理直接在 Supabase Table Editor 完成，不需要修改代码。

## 1. 创建表与权限

在 Supabase 项目的 SQL Editor 中运行：

`supabase/migrations/202608150001_create_comments.sql`

公开的 `comments` 表只保留五个直观字段：

| 字段         | 用途                                                        |
| ------------ | ----------------------------------------------------------- |
| `id`         | 自动生成的评论编号                                          |
| `work_slug`  | 所属人物页，例如 `character:raskolnikov`                    |
| `content`    | 纯文本评论，1—400 字                                        |
| `created_at` | 自动生成的提交时间                                          |
| `status`     | `approved` 显示、`hidden` 隐藏，另保留 `pending` 供人工暂存 |

迁移还创建内部限流表 `comment_rate_limits`。它仅保存随机浏览器令牌的 HMAC，24 小时后清理；不读取或保存明文 IP，也不向浏览器开放。

## 2. 配置环境变量

复制 `.env.example` 为 `.env.local`，填写：

- `NEXT_PUBLIC_SUPABASE_URL`：Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`：Supabase anon/publishable key，仅用于读取受 RLS 限制的公开评论
- `SUPABASE_SERVICE_ROLE_KEY`：仅供 Route Handler 调用受控写入函数，绝不能带 `NEXT_PUBLIC_` 前缀
- `COMMENT_RATE_LIMIT_SECRET`：独立随机密钥，可用 `openssl rand -hex 32` 生成
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`：Cloudflare Turnstile 的公开 Site Key
- `TURNSTILE_SECRET_KEY`：Turnstile 服务端 Secret Key
- `TURNSTILE_EXPECTED_HOSTNAME`：可选；生产域名启用后，服务端还会核对验证结果中的 hostname

部署平台中也要填写同名变量，并确认只有带 `NEXT_PUBLIC_` 的值会进入浏览器包。

## 3. 在 Supabase 中管理

进入 Supabase → Table Editor → `comments`：

- 新评论默认 `status = approved`，提交后立即显示；
- 将 `status` 改成 `hidden`，网站下一次刷新或最多约 30 秒后隐藏；
- 将 `status` 改回 `approved`，评论重新显示；
- 直接删除整行，网站不再显示该评论；
- 如需临时搁置，可改成 `pending`，前台同样不会显示。

无需编辑代码，也无需单独的管理员页面。

## 4. 权限复核

迁移完成后，在 SQL Editor 运行：

`supabase/tests/comments_permissions.sql`

预期结果：

- `comments` 的 `rls_enabled` 和 `rls_forced` 都为 `true`；
- 唯一公开策略是 `SELECT` 且条件为 `status = approved`；
- `anon`、`authenticated` 对表只有 `SELECT`；
- 两者都不能执行写入函数，只有 `service_role` 可以执行。

评论提交还会经过同源检查、Turnstile 服务端验证、400 字限制、纯文本校验，以及每个浏览器令牌十分钟最多三次的数据库原子限流。
