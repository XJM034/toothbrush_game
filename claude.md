# 🦷 Brushing Game Web — CLAUDE 作战手册  
_更新：2026-01-05 · 目标分支：main · 工作目录：/Users/minxian/conductor/workspaces/toothbrush_game/macau_

本手册聚焦**把已完成的动作识别/头套跟随能力接入 prototype 的移动端游戏页面**，交付一个可登录、可交互、在手机浏览器端完整可玩的网页版本，并新增“局内抓拍 → 结果后装饰”闭环。

---

## 0. 全局目标
- 移动端（Safari/Chrome）可直接访问，完成：登录/注册 → 选择时长/皮肤 → 进入游戏 → 实时刷牙识别积分 → 结果页 → 数据落库/本地缓存。
- `prototype/game_play.html` 使用真实识别：露牙 + 握拳 + 晃动 = 刷牙判定；叠加“头套”用**已解锁皮肤**渲染。
- 游戏过程中随机抓拍 6 张照片（含头套/特效画面），游戏结束后送入 `photo_edit.html` 供贴纸装饰；仅本地存储（session/localStorage），不写后端。
- 继续沿用现有 Kawaii UI/交互流（prototype 下的 HTML），只替换内部逻辑为真实引擎。

---

## 1. 现状速览
- **引擎 (React/TS)**：`src/` 已完成 MediaPipe 集成、Teeth/Fist/Shake/BrushGesture 检测器、头套渲染、GameStateMachine、调试渲染。
- **原型 UI (Vanilla HTML)**：`prototype/` 下已有登录/主页/设置/游戏/结果等移动端高保真页面与 Supabase/Memfire 脚本、通用样式与移动修复。
- **资源**：头套图片统一使用 `prototype/SkinSet/{cat,dog,owl,rabbit}.png`
- **认证/数据**：`prototype/supabase_client.js` 提供登录态（`localStorage.brushing_user`）、档案/皮肤表操作；退出守卫在 `prototype/auth_guard.js`。

痛点：原型的 `game_play.html` 目前只做倒计时/示例动画，未接入摄像头、检测、头套、积分逻辑。

---

## 2. 当下最高优先级 (P0)
1) **提炼可复用 Web 引擎**  
   - 从 `src` 抽一个无 React 依赖的入口（建议新建 `src/embed/runtime.ts`），包装：摄像头启动、MediaPipe 初始化、检测循环、GameStateMachine、AvatarRenderer。  
   - 通过 Vite lib 模式产物（UMD/ESM 双构建），输出到 `public/embed/brushing-engine.{js,css}`，对外暴露 `window.BrushGame`.

2) **把引擎接到 `prototype/game_play.html`**  
   - 在 `game_play.html` 加载 `brushing-engine.js`，使用 `window.BrushGame.start()` 绑定：`video`（可隐藏）、`canvas`（现有 UI 叠层）、回调。  
   - 用引擎回调刷新：能量条/倒计时、积分、状态提示；结束后沿用原逻辑跳转 `game_result.html` 并写入 `sessionStorage.lastGameResult`。

3) **头套 = 已解锁皮肤**  
   - 读取优先级：`sessionStorage.selectedSkin` → `localStorage.selectedSkin` → 档案字段 `profile.selected_skin` → 默认 `owl`。  
   - 将皮肤 id 映射到图片 URL：优先 `prototype/SkinSet/${id}.png`，fallback 到 `public/img/${id}.png`。  
   - 把 URL 传给引擎的 avatar 配置（`faceHoleOffset/anchorOffset/scale` 复用 `src/config/avatar.config.ts` 默认值）。

4) **移动端体验护栏**  
   - 用户手势后再调 `getUserMedia`（防止 Safari 自动阻止）；展示权限失败友好提示。  
   - Safe-area 适配：保留 `safe-area-top`/`bottom` 样式；Canvas 与 UI 分层不互挡点击。  
   - 降低功耗：检测帧率保持 20fps，视频分辨率 640x480，必要时降采样。

5) **局内抓拍 → 装饰闭环**  
   - 在一局游戏内随机 6 个时间点（可用等分时间 ± 随机抖动，每次至少间隔 5s；避开游戏剩余 <5s），从渲染后的 Canvas 捕获 JPEG/PNG（含头套与特效）。  
   - 捕获尺寸：不超过 800px 边长（降低内存），质量约 0.85；存入 `sessionStorage.capturedPhotos` 为 Base64/URL 数组，未满 6 张用占位示例图补足。  
   - 游戏结束后将数组一并写入 `sessionStorage.lastGameResult.photos`，在 `photo_edit.html` 读取并替换当前示例图片/贴纸层来源；用户贴纸编辑仅存回本地（确认保存=下载/导出或写回 sessionStorage），不触达后端。

---

## 3. 建议实现路线
**Step A：Embed 包装层**  
- 新文件 `src/embed/runtime.ts`（或同级）：  
  ```ts
  export type StartOptions = {
    canvas: HTMLCanvasElement;
    video?: HTMLVideoElement;
    avatarId?: string;
    avatarUrl?: string;
    onState?: (state: GameState) => void;
    onScore?: (stats: GameStats, lastPoints: number) => void;
    onError?: (err: Error) => void;
  };
  export function start(opts: StartOptions): StopHandle;
  ```  
- 内部组合：`useCamera` → `useMediaPipe` → `GameStateMachine`（直接用类，不走 React）→ `AvatarRenderer`/`DebugRenderer`。  
- 返回 `stop()` 负责停帧/关流。确保所有依赖（模型路径、默认 config）内嵌或从 `window.BrushGame.config` 可覆写。

**Step B：Vite 输出**  
- 在 `vite.config.ts` 增加 lib 构建条目（保持现有 SPA 开发不受影响）：  
  ```ts
  build: { lib: { entry: 'src/embed/runtime.ts', name: 'BrushGame', formats: ['umd','es'], fileName: 'brushing-engine' } }
  ```  
  产物放 `public/embed/` 或 `prototype/lib/`，HTML 直接 `<script src="./embed/brushing-engine.umd.js"></script>`.

**Step C：改造 `prototype/game_play.html`**  
- 页面结构保持；在脚本区：  
  - 绑定 `const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;`（给现有 Canvas 加 id）。  
  - 根据登录/档案读取皮肤 id，调用 `BrushGame.start({ canvas, avatarId, avatarUrl, onState, onScore })`.  
  - `onScore` 更新 `germsKilled`/`energyTime`/进度条；定时器可直接用 `BrushGame` 提供的剩余时间（`getRemainingTime()`），避免双重计时。  
  - 结束/退出保持原跳转逻辑。

**Step D：结果页与解锁逻辑**  
- 结果页继续用 `sessionStorage.lastGameResult`，但新增字段：`score`, `successCount`, `durationMs`.  
- 皮肤掉落：可在 `game_result.html` 读取 `lastGameResult` 并写入 `localStorage.selectedSkin`；若后端可用则写 `user_skins` 表。

**Step E：局内抓拍 & 装饰页接线**  
- 在 `BrushGame.start` 内挂一个 `photoScheduler`：根据游戏时长生成 6 个时间戳（均分 + 1-3s 抖动），在检测循环里当 `now >= slot` 时对 Canvas `toDataURL('image/jpeg', 0.85)` 抓拍。  
- 抓拍数据推入 `capturedPhotos[]`，保留最多 6 条；结束/退出时写入 `sessionStorage.capturedPhotos`，并随 `lastGameResult.photos` 一起存。  
- `prototype/photo_edit.html` 加载时优先用 `sessionStorage.capturedPhotos` 填充 6 张主图（不足则用现有 sample 图补齐），贴纸层沿用现有逻辑；保存/取消仍不触发后端，只清理 sessionStorage。

---

## 4. 关键文件索引
- **Embed 引擎入口**：`src/embed/index.ts`, `src/embed/runtime.ts`
- **引擎核心**：`src/core/detectors/*`, `src/core/game/GameStateMachine.ts`, `src/core/rendering/AvatarRenderer.ts`
- **类型定义**：`src/types/*`
- **MediaPipe 封装**：`src/mediapipe/*`
- **配置**：`src/config/mediapipe.config.ts`
- **原型游戏页**：`prototype/game_play.html`（已接入引擎），结果页 `prototype/game_result.html`，主页 `prototype/home.html`，认证守卫 `prototype/auth_guard.js`
- **装饰页**：`prototype/photo_edit.html`（读取 sessionStorage.capturedPhotos 生成 6 张幻灯，贴纸编辑仅本地）
- **构建产物**：`prototype/lib/embed/brushing-engine.{umd,esm}.js`
- **资源**：`prototype/SkinSet/*.png`, 模型 `public/models/*.task`

---

## 5. 验收标准 (DOD)
- 手机端实机（iPhone Safari / Android Chrome）打开 `prototype/game_play.html`：  
  - 能申请摄像头权限并显示头套跟随。  
  - 露牙 → 握拳 → 晃动连续 800ms 判定成功，加分即时体现在页面进度/能量。  
  - 退出或倒计时结束跳到结果页，分数与掉落皮肤正确展示。  
  - 无摄像头/权限拒绝时给出可返回主页的提示，不崩溃。
- 游戏内自动抓拍 6 张：结束后进入 `photo_edit.html` 能看到这 6 张（不足用占位补齐），可贴纸装饰并本地保存/取消，不产生后端写入。

---

## 6. 快速命令
- 开发模式（React 引擎验证）：`npm run dev` → https://localhost:5173  
- 构建嵌入包（待添加脚本）：`npm run build:embed`（建议在 package.json 增加）。  
- 原型预览：直接用文件协议或 `npx serve prototype`（注意 HTTPS 才能调摄像头；可用 `vite preview` 配置静态目录）。

---

## 7. 风险与注意
- iOS 必须 HTTPS + 用户手势才能启摄像头；调试时用 `npm run dev -- --host --https`.  
- 模型体积约 11MB 总计，需预加载提示/进度；可考虑 CDN fallback。  
- 引擎产物需与原型静态文件同源以避免 CORS/权限问题。  
- 确保 Canvas 层的 `pointer-events` 设为 `none`，避免挡住 UI 按钮。

---

## 8. 下一次提交建议
1. 实现 `src/embed/runtime.ts` + Vite lib 构建并产出 `public/embed/brushing-engine.js`。  
2. 在 `prototype/game_play.html` 接线，最小可跑通流程。  
3. 在结果页写入/读取 `selectedSkin`，实现皮肤掉落与下局穿戴。  
4. 接入抓拍调度与 `sessionStorage.capturedPhotos`，让 `photo_edit.html` 展示真实截图。  
5. 真机 smoke test（iOS/Android），记录性能与权限提示。

> 准备好后可直接从 Step A 开做；有新指令再更新本手册。  

---

## 9. 遗留清理与优化处理计划 ✅ 已完成

**执行日期**：2026-01-05

### 已删除文件清单
- **旧版 React 入口**：`/index.html`, `src/main.tsx`, `src/App.tsx`
- **旧版 React 组件**：`src/components/` 目录（GameScreen, AvatarSelector, DiagnosticsScreen, GamePlayScreen, TestScreen）
- **旧版 React Hooks**：`src/hooks/` 目录（useCamera, useMediaPipe, useGameStateMachine）
- **旧版样式**：`src/styles/global.css`
- **旧版配置**：`src/config/avatar.config.ts`, `src/config/default.config.ts`
- **旧版静态资源**：`img/` 目录（约 8.3MB，包含 cat.png, dog.png, rabbit.png 等）
- **重复构建产物**：`prototype/lib/brushing-engine.*.js`（旧位置，现统一输出到 `prototype/lib/embed/`）

### 已更新配置
- `src/config/index.ts`：移除对已删除配置文件的导出

### 验证结果
- `npm run build:embed` 构建成功
- Prototype 功能不受影响

### 当前资源结构
- 皮肤图片：`prototype/SkinSet/*.png`
- MediaPipe 模型：`public/models/*.task`
- 构建产物：`prototype/lib/embed/brushing-engine.{umd,esm}.js`

详细清理计划见 `.context/cleanup_plan.md`
