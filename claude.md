# 🎮 刷牙游戏 Web MVP - Claude Code 工作指南

## 项目概述

这是一个类似 **Pokemon Smile** 的刷牙游戏 Web MVP，基于 **MediaPipe Tasks Vision** 实现实时人脸和手部追踪，提供沉浸式的刷牙互动体验。

**核心特性：**
- ✅ 实时人脸追踪 + 头套跟随（Face Landmarker - 468 点）
- ✅ 手部动作识别（Hand Landmarker - 21 点）
- ✅ 露牙判定（Blendshapes jawOpen/mouthOpen）
- ✅ 刷牙动作识别（握拳 + 快速晃动）
- ✅ 游戏积分系统
- ✅ 跨平台就绪（Web MVP，后续可迁移到 iOS/Android）

---

## 📊 当前进度

### ✅ Day 1 已完成（基础设施 + MediaPipe 集成）

**完成度: 70%**

#### 基础设施 (100%)
- [x] Vite + React + TypeScript 项目初始化
- [x] HTTPS 配置（`@vitejs/plugin-basic-ssl`）
- [x] MediaPipe 模型文件下载
  - `public/models/face_landmarker.task` (~3.6MB)
  - `public/models/hand_landmarker.task` (~7.6MB)

#### 类型定义 (100%)
- [x] `src/types/game.types.ts` - 游戏状态机 S0-S7、事件、配置
- [x] `src/types/mediapipe.types.ts` - 追踪结果类型定义
- [x] `src/types/detector.types.ts` - 检测器接口

#### 配置系统 (100%)
- [x] `src/config/default.config.ts` - 默认阈值 + URL 参数覆盖
- [x] `src/config/mediapipe.config.ts` - 模型路径和初始化选项
- [x] `src/config/avatar.config.ts` - 头套配置（3 个示例）

#### 核心模块 (100%)
- [x] `src/core/utils/smoothing.ts` - EMA 平滑算法
- [x] `src/core/utils/geometry.ts` - 几何计算（距离、角度、坐标转换）
- [x] `src/mediapipe/FaceTracker.ts` - Face Landmarker 封装
- [x] `src/mediapipe/HandTracker.ts` - Hand Landmarker 封装
- [x] `src/hooks/useCamera.ts` - 摄像头权限和控制
- [x] `src/hooks/useMediaPipe.ts` - MediaPipe 初始化 + 推理循环
- [x] `src/components/TestScreen.tsx` - 测试组件（实时关键点可视化）

### ⏳ Day 2-5 待完成

- [ ] 渲染层实现（AvatarRenderer、DebugRenderer）
- [ ] 头套选择页面 + 头套跟随
- [ ] 检测器实现（TeethGate、Fist、Shake、BrushGesture）
- [ ] 状态机和游戏流程串联
- [ ] 调试面板和 UI 完善
- [ ] 性能优化和跨浏览器测试

---

## 🏗️ 项目架构

### 文件结构

```
src/
├── types/                      # 类型定义
│   ├── game.types.ts           # 游戏状态、配置、事件
│   ├── mediapipe.types.ts      # MediaPipe 检测结果类型
│   └── detector.types.ts       # 检测器接口
├── config/                     # 配置管理
│   ├── default.config.ts       # 默认阈值（可通过 URL 参数覆盖）
│   ├── mediapipe.config.ts     # MediaPipe 模型路径和初始化选项
│   └── avatar.config.ts        # 头套配置列表
├── core/                       # 核心逻辑层（平台无关）
│   ├── state-machine/
│   │   ├── GameStateMachine.ts # 状态机 (S0-S7)
│   │   └── states.ts           # 状态枚举
│   ├── detectors/              # 检测器（待实现）
│   │   ├── TeethGateDetector.ts
│   │   ├── FistDetector.ts
│   │   ├── ShakeDetector.ts
│   │   └── BrushGestureDetector.ts
│   └── utils/
│       ├── smoothing.ts        # EMA 平滑
│       ├── geometry.ts         # 几何计算
│       └── validation.ts       # 数据验证 (待实现)
├── mediapipe/                  # MediaPipe 集成层
│   ├── FaceTracker.ts          # Face Landmarker 封装
│   ├── HandTracker.ts          # Hand Landmarker 封装
│   └── ModelLoader.ts          # 模型加载管理 (待实现)
├── rendering/                  # 渲染层（待实现）
│   ├── AvatarRenderer.ts       # 头套渲染
│   ├── DebugRenderer.ts        # 调试渲染
│   └── transforms.ts           # 2D 仿射变换
├── hooks/                      # React Hooks
│   ├── useCamera.ts            # 摄像头管理
│   ├── useMediaPipe.ts         # MediaPipe 推理循环
│   └── useThrottledDetection.ts # 降采样推理 (待实现)
└── components/                 # React 组件
    ├── TestScreen.tsx          # 测试组件（当前可用）
    ├── AvatarSelector/         # 头套选择页 (待实现)
    ├── GameScreen/             # 游戏主界面 (待实现)
    └── DebugPanel/             # 调试面板 (待实现)
```

### 数据流

```
用户点击启动摄像头
    ↓
useCamera Hook → 获取媒体流 → <video> 元素
    ↓
useMediaPipe Hook → 初始化 Face/Hand Landmarker
    ↓
requestAnimationFrame 循环
    ├─ FaceTracker.detectForVideo() → 468 点 + Blendshapes
    └─ HandTracker.detectForVideo() → 21 点手关键点
    ↓
onDetection 回调
    ├─ AvatarRenderer → Canvas 绘制头套（待实现）
    ├─ TeethGateDetector → 判定露牙（待实现）
    ├─ BrushGestureDetector → 判定刷牙动作（待实现）
    └─ Canvas → 实时可视化
    ↓
GameStateMachine → 状态转换（待实现）
    ↓
UI 更新 → 积分、提示、完成反馈
```

---

## 🚀 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn
- 现代浏览器（Chrome, Safari, Firefox）
- 摄像头权限

### 安装和运行

```bash
cd /Users/minxian/Documents/alex_project/toothbrush_demo

# 安装依赖（已完成）
npm install

# 启动开发服务器（已运行）
npm run dev

# 访问 https://localhost:5173/
# （忽略 SSL 证书警告，点击继续）
```

### 测试当前功能

1. **打开网页** → `https://localhost:5173/`
2. **点击"启动摄像头"** → 允许浏览器摄像头权限
3. **观察 Canvas**：
   - 🟢 绿色点：人脸 468 个关键点
   - 🔴 红色点：手部 21 个关键点
   - ⬜ 左上角：FPS、检测状态、张嘴分数

---

## ⚙️ 核心配置

### 默认阈值（`src/config/default.config.ts`）

```typescript
export const defaultConfig = {
  teethGate: {
    openThreshold: 0.5,        // 张嘴阈值
    stableMs: 400,             // 稳定时长
    blendshapeKeys: ['jawOpen', 'mouthOpen']
  },
  fist: {
    curledFingersMin: 4,       // 最少卷曲手指
    distanceThreshold: 0.15    // 卷曲判定距离
  },
  shake: {
    speedThreshold: 0.05,      // 速度阈值
    windowMs: 800,             // 滑窗时长
    highSpeedRatio: 0.35,      // 高速帧占比
    directionChangesMin: 3     // 最少方向变化
  },
  rendering: {
    targetFps: 30,
    detectionFps: 20,          // 推理频率（降采样）
    videoResolution: { width: 640, height: 480 },
    smoothingAlpha: 0.3        // EMA 平滑系数
  },
  debug: {
    enabled: false             // URL 参数: ?debug.enabled=true
  }
};
```

### URL 参数覆盖示例

```
# 启用调试面板，降低张嘴阈值
https://localhost:5173/?debug.enabled=true&teethGate.openThreshold=0.4
```

---

## 🔑 关键 API 和类

### FaceTracker

```typescript
const faceTracker = new FaceTracker();
await faceTracker.initialize(modelPath, wasmPath, smoothingAlpha);

const result = faceTracker.detectForVideo(video, timestamp);
// result: {
//   landmarks: NormalizedLandmark[],  // 468 点人脸关键点
//   blendshapes: Map<string, number>, // 表情系数
//   faceCenter: Point,                // 平滑后的人脸中心
//   faceScale: number,                // 平滑后的人脸尺度
//   faceRotation: number              // 平滑后的人脸旋转角度
// }
```

### HandTracker

```typescript
const handTracker = new HandTracker();
await handTracker.initialize(modelPath, wasmPath);

const result = handTracker.detectForVideo(video, timestamp);
// result: {
//   landmarks: NormalizedLandmark[],   // 21 点手关键点
//   worldLandmarks: WorldLandmark[],   // 3D 世界坐标
//   handedness: string                 // "Left" 或 "Right"
// }
```

### Blendshapes（表情分类）

MediaPipe Face Landmarker 输出的 Blendshapes 包括：

**嘴部相关**（露牙判定所需）：
- `jawOpen` - 嘴张开程度
- `mouthOpen` - 嘴部打开

**眼睛相关**：
- `eyeBlinkLeft`, `eyeBlinkRight`

**眉毛和脸部**：
- `browDownLeft`, `browDownRight`, `browInnerUp` 等

详见：[MediaPipe Blendshapes 完整列表](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js)

---

## 🎯 下一步工作（Day 2-5）

### Day 2: 渲染层 + 头套跟随

**任务：**
1. 实现 `src/rendering/AvatarRenderer.ts` - 头套 Canvas 渲染
   - 基于人脸关键点计算位置、缩放、旋转
   - 2D 仿射变换叠加头套
2. 实现 `src/rendering/DebugRenderer.ts` - 调试信息渲染
3. 创建 `src/components/AvatarSelector.tsx` - 头套选择页面
4. 准备 3-5 个头套 PNG 图片 → `public/avatars/`

**验收标准：**
- 头套能跟随人脸移动、旋转、缩放（平滑无抖动）
- 调试模式能显示关键点

**关键算法：**
```typescript
// 从 landmarks 计算头套参数
const { center, scale, rotation } = getFaceTransformFromLandmarks(
  landmarks,
  canvasWidth,
  canvasHeight
);

// EMA 平滑
smoothedCenter = smoothPoint(prevCenter, center, 0.3);
smoothedScale = smoothScalar(prevScale, scale, 0.3);
smoothedRotation = smoothScalar(prevRotation, rotation, 0.3);

// Canvas 2D 变换
ctx.translate(smoothedCenter.x, smoothedCenter.y);
ctx.rotate(smoothedRotation);
ctx.scale(smoothedScale, smoothedScale);
ctx.drawImage(avatarImage, -width/2, -height/2);
```

### Day 3: 检测器 + 状态机

**任务：**
1. 实现 `src/core/detectors/TeethGateDetector.ts`
   - 判定条件：`jawOpen > 0.5 && stableDuration >= 400ms`
2. 实现 `src/core/detectors/FistDetector.ts`
   - 基于手部 21 点计算手指卷曲度
   - 判定条件：`curledFingers >= 4`
3. 实现 `src/core/detectors/ShakeDetector.ts`
   - 基于手腕位置轨迹（world 坐标）计算速度
   - 判定条件：`highSpeedRatio > 0.35 in 800ms window`
4. 实现 `src/core/detectors/BrushGestureDetector.ts`
   - 组合握拳 + 晃动判定
5. 实现 `src/core/state-machine/GameStateMachine.ts`
   - 管理 S0-S7 状态转换
6. 实现 `src/context/GameContext.tsx` - 全局状态管理

**验收标准：**
- 完整流程可跑通：选头套 → 启动摄像头 → 露牙 → 刷牙 → 完成
- 积分正确计算和显示

### Day 4: 调试面板 + UI 完善

**任务：**
1. 实现 `src/components/DebugPanel/` - 调试面板
   - 实时阈值调节（slider）
   - 实时指标显示（FPS、检测分数）
   - 关键点可视化开关
2. 实现 `src/components/GameScreen/PromptOverlay.tsx` - 游戏提示
3. 实现 `src/components/CompletionScreen.tsx` - 完成页面
4. URL 参数解析（配置热更新）
5. UI 美化和动画效果

### Day 5: 性能优化 + 测试

**任务：**
1. 实现 `src/hooks/useThrottledDetection.ts` - 降采样（20fps 推理）
2. 优化视频分辨率（640x480）
3. 资源预加载
4. 跨浏览器测试
5. 移动端适配（iOS Safari、Android Chrome）
6. Bug 修复

---

## 🐛 常见问题排查

### 问题 1: 摄像头权限错误

**错误：** `Failed to execute 'getUserMedia' on 'MediaDevices': Illegal invocation`

**原因：** 方法丢失 `this` 上下文

**解决：** 直接调用而不是解构
```typescript
// ❌ 错误
const getUserMedia = navigator.mediaDevices?.getUserMedia;
await getUserMedia({...});

// ✅ 正确
await navigator.mediaDevices.getUserMedia({...});
```

### 问题 2: Canvas 黑屏

**原因：** `video.videoWidth` 未初始化或 Canvas 大小为 0

**解决：** 检查条件
```typescript
if (video.videoWidth > 0 && video.videoHeight > 0) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
}
```

### 问题 3: MediaPipe 加载失败

**检查：**
1. 浏览器控制台（F12）查看错误信息
2. 确认模型文件已下载：`public/models/` 目录
3. WASM 路径正确：`mediaPipeConfig.wasmPath`

### 问题 4: FPS 低或检测不稳定

**优化方向：**
1. 降低视频分辨率（从 640x480 → 480x360）
2. 增加降采样间隔（20fps → 15fps）
3. 检查浏览器标签页是否在后台（会降低优先级）
4. 关闭其他耗资源应用

---

## 📚 有用的链接

- [MediaPipe Face Landmarker - Web JS](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js)
- [MediaPipe Hand Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker)
- [MediaPipe GitHub](https://github.com/google-ai-edge/mediapipe)
- [设计文档](./设计文档.md)

---

## 📝 工作日志

### 会话 1 (当前)

**时间：** 2024-12-18

**完成内容：**
- ✅ 项目初始化 (Vite + React + TS)
- ✅ 下载 MediaPipe 模型文件
- ✅ 类型定义系统设计
- ✅ 配置管理系统
- ✅ 工具函数 (EMA 平滑、几何计算)
- ✅ FaceTracker + HandTracker 实现
- ✅ useCamera + useMediaPipe Hooks
- ✅ 测试组件 (实时关键点可视化)
- ✅ 修复 getUserMedia 上下文问题
- ✅ 修复 Canvas 渲染问题
- ✅ 完成 claude.md 工作指南

**遇到的问题和解决方案：**
1. getUserMedia 上下文丢失 → 直接调用而不解构
2. Canvas 黑屏 → 确保 video.videoWidth > 0 再开始绘制
3. React Hook 规则冲突 → 使用 useCallback 定义回调函数

**下一步：** 开始 Day 2 - 渲染层和头套跟随

---

## 🎨 代码风格指南

### TypeScript

- 使用 strict 模式
- 优先使用接口 `interface` 而不是 `type`
- 所有 public 方法需要 JSDoc 注释

### React

- 使用函数组件 + Hooks
- 使用 `useCallback` 优化性能
- Props 使用接口定义

### 文件命名

- 组件：PascalCase (e.g., `AvatarSelector.tsx`)
- Hooks：camelCase with `use` prefix (e.g., `useCamera.ts`)
- 工具/类：PascalCase (e.g., `FaceTracker.ts`)
- 其他：camelCase (e.g., `smoothing.ts`)

---

## 🔗 相关配置文件

| 文件 | 作用 |
|-----|------|
| `vite.config.ts` | Vite 配置（HTTPS、模型打包） |
| `tsconfig.json` | TypeScript 编译配置 |
| `package.json` | 项目依赖和脚本 |
| `src/config/default.config.ts` | 游戏阈值和参数 |
| `src/types/index.ts` | 类型导出中心 |

---

**状态：** 🟢 **Day 1 完成，Day 2 待开始**

**最后更新：** 2024-12-18
