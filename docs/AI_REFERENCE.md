# AI Reference

更新：2026-06-23。本文记录当前仓库事实和低频操作说明；产品需求见 `docs/product/PRD.md`，根文档只路由，不承载长历史。所有事实来自本工作区代码和命令输出，后续仍需按需复核。

## 当前状态
- 项目是 Brushing Master Web 原型，不是完整原生 App。
- 页面层在 `prototype/`，主要是独立 HTML + Tailwind CDN + FontAwesome CDN + 共享样式/脚本。
- 识别层在 `src/`，已提炼为无 React 依赖的 embed runtime；旧 React Hooks/Components 已不在当前源码树。
- `index.html` 是 splash 入口，自动跳到 `/prototype/home.html`。
- 根 `AGENTS.md` 与 `CLAUDE.md` 是镜像文档；编辑后用 `cmp -s AGENTS.md CLAUDE.md` 复核。
- 根 `README.md` 是人类维护入口；`docs/README.md` 是文档索引；`docs/product/PRD.md` 是当前产品需求入口；`docs/PROJECT_STRUCTURE.md` 是目录整理边界。
- 早期 UI 参考截图和样例图已从 `prototype/Reference`、`prototype/Sample_ima` 移到 `docs/assets/legacy-prototype/`；它们不参与当前运行。
- 当前分支/工作树可能变化；不要把某个本地 worktree 名写成永久事实。

## 运行时文件地图
- `src/embed/index.ts`：库导出入口，Vite embed 构建读取这里。
- `src/embed/runtime.ts`：摄像头、MediaPipe 初始化、20fps 检测、头套渲染、抓拍调度、`BrushGame.start()`。
- `src/core/detectors/TeethGate.ts`：露牙/张嘴 gate。
- `src/core/detectors/Fist.ts`：幼儿友好握拳检测，当前默认构造可用 2 根弯曲手指触发。
- `src/core/detectors/Shake.ts`：晃动检测。
- `src/core/detectors/BrushGesture.ts`：组合露牙、握拳、晃动；露牙一次后整局锁定，默认 300ms 完成一次刷牙。
- `src/core/game/GameStateMachine.ts`：游戏状态与 `score/successCount/accuracy` 统计。`score` 是底层统计，不等于当前 UI 必须展示积分。
- `src/core/rendering/AvatarRenderer.ts`：头套贴合。
- `src/config/mediapipe.config.ts`：本地模型/WASM 优先，CDN fallback。

## Prototype 页面地图
- `prototype/login.html`：账号密码登录，成功后写 `localStorage.brushing_user`，清理 `activeProfileId`。
- `prototype/auth_guard.js`：受保护页面加载时检查 `brushing_user`，要求至少有 `id` 和 `account`。
- `prototype/home.html`：主页、活跃档案、进入准备页。
- `prototype/game_ready.html`：选择 1/2/3 分钟和皮肤，写 `localStorage.selectedDuration`、`selectedSkin`。
- `prototype/game_play.html`：调用 embed 引擎，显示视觉层、提示、倒计时、抓拍与结束数据。
- `prototype/game_result.html`：读取 `sessionStorage.lastGameResult`，计算/保存金币和会话，入口到收藏或装饰页。
- `prototype/photo_edit.html`：读取 `sessionStorage.capturedPhotos`，贴纸装饰和本地保存/导出；不写后端照片。
- `prototype/collection.html`：皮肤收藏和金币购买；成就 Tab 已从 UI 移除。
- `prototype/settings.html`：档案、提醒、偏好等设置；UI 文案仍可能提到金币用途。

## 资源与构建
- `vite.config.ts`：
  - 默认构建是 SPA/Vite 构建。
  - `BUILD_MODE=embed` 时构建库，入口 `src/embed/index.ts`，输出到 `prototype/lib/embed`。
- `vite.prototype.config.ts`：HTTPS 原型服务，端口 5174，打开 `/prototype/home.html`。
- `scripts/fetch-models.mjs`：
  - 从 `node_modules/@mediapipe/tasks-vision/wasm` 复制 WASM 到 `public/mediapipe/wasm` 与 `prototype/lib/embed/mediapipe/wasm`。
  - 确保 `face_landmarker.task`、`hand_landmarker.task` 存在；可从本地 bundled/embed 位置复制，缺失时下载。
- `.gitignore` 忽略 `.task` 大模型文件；构建前依赖 `prepare:assets` 补齐。
- 皮肤运行时资源当前在 `prototype/SkinSet/`，默认配置优先 `.webp`。
- `prototype/Avatar_ima/` 被主页和设置页引用，`prototype/game-assets/` 被游戏页引用；未经引用迁移和浏览器验证不要移动。
- `docs/assets/legacy-prototype/` 存放非运行的旧参考截图/样例图。
- `cleanup/delete-candidates/` 存放未被运行时代码引用的设计源文件，删除前按 README 再确认。

## 数据与存储边界
- `prototype/supabase_client.js` 初始化 Memfire/Supabase 客户端，暴露 `window.BrushingMasterDB`。
- schema 参考在 `prototype/docs/memfire_v2_complete.sql`，包含 `user_profiles`、`brushing_sessions`、`user_skins`、`user_stickers`、成就相关表等。
- 当前 SQL 的 RLS 策略为匿名宽松读写，注释也标注生产环境应更严格；涉及生产化、安全或用户数据时必须重新审计。
- 当前前端同时依赖：
  - `localStorage.brushing_user`：登录态。
  - `localStorage.activeProfileId`、`cachedActiveProfile`、`selectedSkin`、`selectedDuration` 等：页面间轻量状态。
  - `sessionStorage.lastGameResult`：结果页数据。
  - `sessionStorage.capturedPhotos`：局内照片数组。
- 照片不进数据库。若要改成后端存储，必须先明确隐私、配额、删除、权限和审计策略。

## 当前游戏行为事实
- 游戏启动需要用户点击 `loadingStartBtn`，这是 iOS/移动浏览器相机权限兼容点。
- `BrushGame.start()` 默认 640x480 前置摄像头、20fps 检测、游戏时长由准备页选择。
- 抓拍默认 `PHOTO_CAPTURE_LIMIT = 4`；低端设备降低边长和 JPEG 质量。
- 保存照片失败不会阻断游戏结束：先存全部，再降级 3 张，再降级 1 张，全部失败则清空照片并继续跳结果页。
- 视觉层包括森林边框、牙齿、气泡、菌斑、猫头鹰精灵；低端设备会减少部分效果。
- 菌斑消除门槛按时长变化：1 分钟 20 次、2 分钟 30 次、3 分钟 50 次成功消除一个。

## 命令与验证地图
- 首次运行先安装依赖。当前锁文件是 `package-lock.json`，默认 `npm install`；`package.json` 的 `packageManager` 与锁文件不一致，是已知缺口。
- 依赖不提交；新 checkout 构建、lint、预览前需要先安装依赖。2026-06-23 本地曾执行 `npm install` 以运行和验证项目，但不要把 `node_modules` 状态当成仓库事实。
- `npm run serve:prototype`：启动 HTTPS 原型服务，用于移动端和 agent-browser QA。
- `npm run build:embed`：验证 `src/embed`、检测器、模型路径、Vite lib 输出。
- `npm run build`：验证 TS 和默认 Vite 构建，输出 `dist`。
- `npm run lint`：脚本存在，但当前未发现 `eslint.config.*`；ESLint v9 会报缺少配置。跑通前不要把 lint 当作硬护栏。
- 当前没有 CI、测试套件、Playwright 配置或文档链接检查器；相关验证必须在本次任务里显式执行并记录结果。
- 浏览器 QA 可用：
  - `agent-browser open https://localhost:5174/prototype/home.html`
  - `agent-browser snapshot -i`
  - `agent-browser click @...`
  - `agent-browser fill @... "..."`
- 认证绕过仅用于本地调试：写入 `localStorage.brushing_user = {"id":"test","account":"test"}`。不要把绕过态当真实登录验证。

## 最近验证记录
- 2026-06-23 文档和目录整理后执行 `npm run build`：通过。
- 2026-06-23 文档和目录整理后执行 `npm run build:embed`：通过。
- 2026-06-23 执行 `cmp -s AGENTS.md CLAUDE.md`：通过。
- 2026-06-23 通过 HTTPS 检查 `https://localhost:5174/prototype/home.html`、`prototype/game_play.html`、`prototype/SkinSet/owl.webp`、`prototype/game-assets/forest-border.png`、`prototype/lib/embed/brushing-engine.umd.js`：均返回 200。
- 2026-06-23 执行 `npm run lint`：失败，原因为未发现 `eslint.config.*`，与当前已知缺口一致。

## 已知过时或需谨慎引用的文档
- `docs/md/archive/2026-06-23-doc-consolidation/`：旧产品 prompt、早期设计、2.0 设计、旧实施文档、iOS 迁移文档；仅用于追溯，不能直接当当前事实。
- `docs/md/archive/2026-06-17-root-agent-docs/`：本次优化前的长根文档快照；仅用于追溯，不是当前操作指南。

## Active Queue 规则
- `.context/todos.md` 当前为空；未来如果作为 active queue，每条必须包含来源、影响范围、下一步、完成证据。
- 完成证据可以是代码位置、命令输出、浏览器 QA、截图/录屏、PR/commit 或用户明确验收。
- 证据充分时可从 queue 移除；需要保留历史时移到 `docs/md/archive/<date>-<topic>/`。
- 证据冲突或只来自聊天记忆时，不要静默改写 queue，先向用户确认。

## 文档更新路由
- 根规则或 AI 操作入口变化：更新 `AGENTS.md` 和 `CLAUDE.md`，保持镜像。
- 当前实现事实、验证地图、已知缺口变化：更新本文件。
- 文档入口、历史/当前事实分类变化：更新 `docs/README.md`。
- 目录归属、运行资源边界或整理流程变化：更新 `docs/PROJECT_STRUCTURE.md`，并按需同步入口文档。
- 产品范围、用户故事、验收或测试 seam 变化：更新 `docs/product/PRD.md`，并在必要时同步本文件。
- 数据库/schema 变化：更新 `prototype/docs/*.sql` 和本文件的数据边界。
- 大段历史、完成计划、废弃长说明：归档到 `docs/md/archive/<date>-<topic>/`。
- `handoff/` 当前不存在；如果用 `$handoff` 创建交接文档，后续新会话应优先读最新 `./handoff/*-handoff.md`，但仍回到代码/命令复核。

## 检查清单
- 根文档是否短、镜像、指向 `docs/README.md` 与本文件。
- `cmp -s AGENTS.md CLAUDE.md` 是否通过。
- PRD 是否仍是当前产品需求入口，旧设计文档是否仍在 archive 而不是活跃入口。
- 是否把过时事实从根文档移出并归档。
- 命令是否和 `package.json` / Vite 配置一致。
- 构建输出是否仍是 `prototype/lib/embed`。
- 相机、照片、本地存储、Memfire 写入边界是否明确。
- 未执行验证是否如实标注。
