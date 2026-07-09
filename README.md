# Brushing Master Web

移动端刷牙游戏 Web 原型。当前实现以 `prototype/*.html` 承载 Kawaii 页面流，以 TypeScript embed runtime 承载 MediaPipe 刷牙识别引擎；这不是完整原生 App。

## 当前入口

- 产品需求：`docs/product/PRD.md`
- 文档索引：`docs/README.md`
- 目录结构：`docs/PROJECT_STRUCTURE.md`
- 当前工程事实：`docs/AI_REFERENCE.md`
- Agent 指南：`AGENTS.md` / `CLAUDE.md`

## 快速运行

```bash
npm install
npm run serve:prototype
```

默认打开 `https://localhost:5174/prototype/home.html`。本地 HTTPS 使用自签证书，浏览器首次访问可能需要手动信任。

## 常用命令

- `npm run serve:prototype`：启动 HTTPS 原型服务。
- `npm run build:embed`：构建刷牙识别 embed 包并准备模型/WASM 资源。
- `npm run build`：TypeScript 与默认 Vite 构建，并复制 prototype 到 `dist/prototype`，同时排除本地数据库覆盖文件。
- `npm run configure:supabase-local`：用环境变量中的 Supabase URL 和 publishable/anon key 生成本地前端配置。
- `npm run seed:supabase-auth`：用环境变量中的 Supabase service role key 创建测试 Auth 用户；不要把 secret 写进仓库。
- `npm run lint`：脚本入口存在，但当前仓库未配置 ESLint 规则文件，跑通前不要当硬护栏。

## 目录概览

- `prototype/`：移动端原型页面、运行时静态资源、当前 Supabase 配置与 schema 参考；旧 Memfire SQL 只作历史参考。
- `supabase/`：当前 Supabase 迁移 runbook、migration 与原型测试账号 seed。
- `src/`：MediaPipe 封装、检测器、游戏状态机、渲染器和 embed runtime。
- `public/`：模型与 MediaPipe WASM 静态资源。
- `scripts/`：模型/WASM 准备脚本与 Supabase Auth 测试用户导入脚本。
- `docs/`：当前文档入口、PRD、工程事实、历史归档和非运行设计资产。
- `vercel.json` / `.vercelignore`：Vercel preview 部署命令和本地数据库覆盖文件排除规则。
- `cleanup/delete-candidates/`：未被运行时代码引用的设计源文件候选。

## 当前产品边界

- 游戏启动必须在用户手势后申请摄像头。
- 局内照片只保存到 `sessionStorage` 或本地导出，不写后端。
- 结果页当前主要展示金币；底层分数、旧 XP 和成就表字段不等同于当前 UI。
- 文档与代码冲突时，以当前代码和可运行验证为准。
