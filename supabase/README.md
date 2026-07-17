# Supabase Migration Runbook

当前仓库已从旧 Memfire 连接切到 Supabase Auth/RLS 方案。旧 Supabase 项目 `hcsullmeeyiuomrsbcpv` 已暂停超过 90 天且无法恢复；当前新 Supabase project 为 `bwfpcgdopalydkxydntv`，URL 为 `https://bwfpcgdopalydkxydntv.supabase.co`。

## Files

- `migrations/20260708180000_auth_owned_initial_schema.sql`：正式初始化迁移。
- `migrations/20260709011000_harden_schema_advisors.sql`：修复 Supabase advisor 提示的函数 search_path 和外键索引。
- `migrations/20260709012132_restrict_catalog_write_grants.sql`：收紧目录表 Data API 权限，保持 authenticated 只读。
- `migrations/20260717012328_add_keepalive_probe.sql`：新增公开但无业务数据权限的 `keepalive_probe()` 只读 RPC。
- `seed_test_auth_users.sql`：原型测试账号 seed，不属于正式迁移。
- `../prototype/docs/supabase_initial_schema.sql`：给 prototype 文档区保留的同内容参考副本。
- `../prototype/docs/supabase_auth_users.example.json`：测试账号导入示例。
- `../scripts/seed-supabase-auth-users.mjs`：用 Supabase Admin API 创建测试 Auth 用户。

## New Project Steps

1. 确认 Supabase project `bwfpcgdopalydkxydntv` 可用。
2. 按文件名顺序应用 `migrations/` 下的 SQL。
3. 获取 project URL 和 publishable/anon key。
4. 如需覆盖默认前端配置，生成本地配置：

```bash
SUPABASE_URL="https://bwfpcgdopalydkxydntv.supabase.co" \
SUPABASE_PUBLISHABLE_KEY="<publishable-or-anon-key>" \
npm run configure:supabase-local
```

5. 用 SQL seed 或本地环境变量导入测试 Auth 用户。

当前项目已使用 `seed_test_auth_users.sql` 创建测试账号。若使用 service role key，也可运行：

```bash
SUPABASE_URL="https://<project-ref>.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="<local-service-role-key>" \
npm run seed:supabase-auth
```

`SUPABASE_SERVICE_ROLE_KEY` 只能放在本地环境变量或本机 secret 管理里，不要写入前端脚本、文档或 git。

## Free Project Keepalive

Supabase Free project 会在最近一周用户数据库活动不足时自动暂停。仓库用 `.github/workflows/supabase-keepalive.yml` 每 8 小时调用一次 `keepalive_probe()`，每天产生 3 次真实且无副作用的数据库查询。

- RPC 只返回整数 `1`，不读取或修改业务表。
- 工作流只使用可公开的 publishable key，不使用 service role/secret key。
- 工作流只会在进入 GitHub 默认分支后按计划运行，也可在 Actions 页面手动触发。
- GitHub 公开仓库连续 60 天没有仓库活动时会停用 scheduled workflow；届时需在 Actions 页面重新启用或提交一次 cron 变更。
- 若项目已经暂停，先在 Supabase Dashboard 恢复项目，再运行工作流。

本地手动验证：

```bash
SUPABASE_URL="https://bwfpcgdopalydkxydntv.supabase.co" \
SUPABASE_PUBLISHABLE_KEY="<publishable-key>" \
npm run keepalive:supabase
```

## Verification

远端 project 可用后至少验证：

- migration 应用成功，public schema 中出现用户档案、会话、收藏、目录表。
- Supabase security advisor 没有缺失 RLS 之类的阻断级告警；目录表只应对 `authenticated` 开放 SELECT，不能开放 INSERT/UPDATE/DELETE。
- Auth security advisor 可能提示开启 leaked password protection；这是项目设置，不属于 schema migration。
- `npm run keepalive:supabase` 返回成功，且无 key 时会明确失败。
- `npm run build` 通过。
- HTTPS 原型登录页可用真实测试账号登录。
- 受保护页面能读取/创建当前用户自己的 profile。
