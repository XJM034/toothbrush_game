下面是一份面向 **iOS 端（Swift）** 的《刷牙游戏 iOS 设计文档》，假设你已经在 Web 端用同样的交互逻辑验证过 MVP。本文重点解决 iOS 上的 **摄像头采集、MediaPipe 任务集成、坐标/方向/镜像、实时渲染、性能与掉帧控制**，并复用你 Web 端的“露牙 Gate + 握拳快晃”判定思路。

> 说明：你说的 “MediaPipe FaceMesh” 在移动端更推荐用 **MediaPipe Tasks Vision 的 Face Landmarker** 来做（它输出 face landmarks、blendshapes、以及用于特效渲染的 transformation matrices），本质上就是 FaceMesh 能力的工程化封装，并更适配 iOS 任务接口。([Google AI for Developers][1])

---

# 1. 目标与范围

## 1.1 iOS MVP 目标

实现与 Web 端一致的闭环：

1. 游戏开始前选择卡通头套（PNG/资源包）
2. 开启摄像头 → 头套实时跟随人脸（低抖动）
3. 提示“张嘴露牙”→ **通过 Gate 才能进入下一步**
4. 提示“手部刷牙动作：单手握拳快速晃动”→ **通过判定**
5. 完成一次刷牙 → 加积分、动效反馈

## 1.2 iOS MVP 非目标

* 复杂遮挡（手遮脸/头发遮挡/真实深度遮挡）
* 牙齿像素级可见（MVP 先用“嘴部开合/表情系数”做代理；后续可加轻量分类器）

---

# 2. 技术选型（iOS）

## 2.1 MediaPipe 选型

* **Face Landmarker（iOS）**：输出 3D face landmarks、blendshape scores、facial transformation matrices（做头套特效更稳）([Google AI for Developers][1])
* **Hand Landmarker（iOS）**：输出手部 landmarks、worldLandmarks、handedness，便于“握拳 + 速度/晃动”判断([Google AI for Developers][2])

## 2.2 依赖安装方式（重要）

MediaPipe Tasks Vision 在 iOS 官方推荐通过 **CocoaPods** 集成：

* `pod 'MediaPipeTasksVision'`([Google AI for Developers][3])

## 2.3 运行模式选择

对实时摄像头推荐：

* `runningMode = .liveStream`，使用 `detectAsync(image:timestampInMilliseconds:)`，结果通过 delegate 异步回调([Google AI for Developers][1])

这样你能更自然地实现：

* 摄像头采集线程：持续产出帧
* 推理线程：异步处理（避免主线程被同步阻塞）

## 2.4 硬件加速现实约束（必须纳入）

官方 iOS Setup Guide 明确：**MediaPipe Tasks 在 iOS 仅支持 CPU 推理**。([Google AI for Developers][3])
=> 你的 iOS 性能策略要更激进：降分辨率、降推理频率、丢帧策略、避免 UI 线程做重活。

---

# 3. 总体架构

## 3.1 模块划分

**UI 层**

* AvatarPickerView：头套选择（预览、确认）
* GameView：摄像头预览 + 叠加渲染 + 文案提示 + 积分

**相机层（AVFoundation）**

* CameraSessionManager

  * 配置 `AVCaptureSession`
  * 使用 `AVCaptureVideoDataOutput` 获取 `CMSampleBuffer`
  * 丢帧策略：`alwaysDiscardsLateVideoFrames = true`（推理跟不上就丢帧，不要堆积）([Apple Developer][4])

**视觉推理层（MediaPipe Tasks Vision）**

* FaceTracker

  * FaceLandmarker（liveStream）
  * 输出：landmarks、blendshapes、transformation matrices（可选）
* HandTracker

  * HandLandmarker（liveStream）
  * 输出：landmarks、worldLandmarks、handedness([Google AI for Developers][5])

**游戏逻辑层**

* GameStateMachine：S0~S7（同 Web 版本）
* TeethGate：露牙/张嘴通过逻辑
* BrushGestureDetector：握拳 + 快速晃动
* ScoreSystem：积分与结算

**渲染层**

* Preview：`AVCaptureVideoPreviewLayer`（或自渲染）
* OverlayRenderer：MetalKit / CoreGraphics 叠加头套、调试点、提示 UI（建议先用 CoreGraphics 快速落地，后续再 Metal）

---

# 4. 摄像头采集与帧格式（iOS 落地要点）

## 4.1 输出像素格式：必须 BGRA

MediaPipe iOS Vision Tasks 要求：如果 MPImage 来自 `CVPixelBuffer`/`CMSampleBuffer`，底层 pixel buffer 需要 **`kCVPixelFormatType_32BGRA`**。([fossies.org][6])

因此 `AVCaptureVideoDataOutput.videoSettings` 必须设置成 BGRA（否则会直接不兼容或隐式转换拖垮性能）。

## 4.2 线程与队列

Apple 官方建议：给 `AVCaptureVideoDataOutput` 的 delegate 提供 **serial queue**，确保帧按顺序交付；推理不要放在主线程。([Apple Developer][4])

推荐：

* `cameraQueue`（serial）：接收 sampleBuffer
* `inferenceQueue`（serial 或 limited concurrent）：把 sampleBuffer 包装为 MPImage 并送入 MediaPipe detectAsync

---

# 5. MPImage、方向（orientation）与“前置镜像”坑

## 5.1 MediaPipe iOS 对“镜像方向”的限制

Face Landmarker / Pose Landmarker 文档明确：**不支持 mirrored orientations（如 `.upMirrored` 等）**。([Google AI for Developers][7])

这意味着：

* 你不能简单把前置摄像头的镜像当作输入方向交给 MPImage
* 正确做法是：**输入给 MediaPipe 的帧保持非镜像 orientation**，镜像仅在 UI 显示/渲染层处理

## 5.2 orientation 处理建议（工程策略）

* 对每一帧构建 `MPImage` 时，设置正确的 `orientation`（不要用 mirrored 方向）([fossies.org][8])
* UI 如果用前置镜像显示：

  * preview layer 做镜像
  * overlay 的 x 坐标也要镜像变换（保持头套与脸一致）
* 统一坐标系：你要明确“landmarks 是基于未镜像输入还是镜像显示”，然后在 OverlayRenderer 里做一次性坐标变换。

---

# 6. Face Landmarker：头套跟随与“露牙 Gate”

## 6.1 Face Landmarker 初始化（liveStream）

* `FaceLandmarkerOptions.runningMode = .liveStream`
* 设置 `faceLandmarkerLiveStreamDelegate` 接收异步回调([Google AI for Developers][1])
* `numFaces = 1`（刷牙场景基本单人；并且文档提示 smoothing 仅在 numFaces=1 时生效）([Google AI for Developers][1])

## 6.2 头套实时跟随（推荐两档实现）

### A 档（最快落地：2D PNG + 关键点计算）

每帧从 landmarks 计算：

* 位置：两眼中心点 → 向上偏移到额头
* 缩放：两眼距离（或脸宽）
* 旋转（roll）：两眼连线角度
  再对 x/y/scale/roll 做 EMA 平滑（抗抖）

### B 档（更“AR 稳”：用 transformation matrices）

Face Landmarker 结果可包含 transformation matrices，用于效果渲染的姿态变换（更抗抬头/转头/歪头）([Google AI for Developers][1])
策略：OverlayRenderer 走矩阵驱动（2D/3D都可），贴合更稳。

## 6.3 “露牙 Gate”（MVP 推荐：Blendshape/Jaw Open 代理）

Face Landmarker 输出 blendshape scores（52 个系数示例），可以用来判断“张嘴程度”。([Google AI for Developers][1])

推荐判定（与 Web 一致）：

* 选一个能代表张嘴的系数（如 jawOpen / mouthOpen 类）
* Gate 通过条件：

  * `score > T_open` 且连续稳定 `>= teethStableMs`（例如 400ms）
* 通过后进入下一状态（不要因用户短暂闭嘴来回跳状态，体验会碎）

> 后续升级：mouth ROI + 轻量 TeethVisible 分类器（更接近“露牙”语义）

---

# 7. Hand Landmarker：握拳 + 快速晃动

## 7.1 Hand Landmarker 初始化（liveStream）

* `HandLandmarkerOptions.runningMode = .liveStream`
* delegate 异步回调([Google AI for Developers][2])

结果字段：

* `landmarks`（归一化）
* `worldLandmarks`（更适合算速度/位移）
* `handedness`（左右手分类）([Google AI for Developers][5])

## 7.2 握拳（Fist）判定（规则法）

复用 Web 方案：用手指 tip 与 mcp / wrist 的归一化距离判断卷曲程度：

* 4 指（食/中/无/小）卷曲满足阈值 → fist = true
* 可选：拇指也卷曲，减少误触

## 7.3 快速晃动（Shake）判定（滑窗速度）

用 `worldLandmarks` 的 wrist（或 palm center）轨迹：

* 维护滑窗（例如 800ms）：

  * 速度 `v = |pos(t)-pos(t-1)|/dt`
  * 统计 v > T_speed 的帧占比 或能量 sum(v²)
* 通过条件：

  * fist = true AND 在滑窗内“高速帧占比 > R” AND 可选“方向变化次数> N”

---

# 8. 推理节奏、丢帧与性能策略（iOS 重点）

由于 iOS 仅 CPU 推理([Google AI for Developers][3])，必须在架构层明确“推理预算”：

## 8.1 三段式帧管线

1. 相机帧率：30fps（或设备自适应）
2. 推理帧率：15~30fps（可降采样：每 2 帧推理一次）
3. 渲染帧率：60fps（UI 可以更顺，但推理结果按最近一次“稳定输出”插值/平滑）

## 8.2 关键策略

* `alwaysDiscardsLateVideoFrames = true`：推理跟不上就丢帧，别排队堆积([Apple Developer][4])
* MediaPipe `detectAsync` 回调做轻量计算，重活（渲染合成/统计）可分派到单独队列
* 降低输入分辨率（例如 640x480 或更低）优先于优化算法细节
* Smoothing：EMA（便宜有效），减少视觉抖动带来的“看起来不准”

---

# 9. 状态机与产品交互（iOS 版）

状态机与 Web 一致（建议你直接复用同一套定义）：

* `S0_SelectAvatar`
* `S1_CameraInit`
* `S2_FaceTracking`（常驻）
* `S3_PromptTeeth` → `S4_TeethConfirmed`
* `S5_PromptBrushGesture` → `S6_BrushGestureConfirmed`
* `S7_Completed`

iOS 实现建议：

* 用一个 `GameStore`（ObservableObject / Redux 风格都行）统一管理：

  * 当前状态
  * 当前分数
  * 当前检测信号（mouthOpenScore、fist、shakeEnergy、faceTracked 等）
* UI 仅订阅状态并展示，不直接做推理逻辑（避免耦合）

---

# 10. 渲染实现建议（从快到稳）

## 10.1 MVP（最快）

* `AVCaptureVideoPreviewLayer` 显示摄像头
* 一个透明 OverlayView（UIView）用 CoreGraphics 绘制头套 PNG
* 每次收到 FaceLandmarkerResult：

  * 更新头套变换参数（位置/缩放/角度）
  * 触发 overlay 重绘

## 10.2 性能增强（后续）

* 用 `MTKView + Metal` 做视频纹理 + 头套纹理合成
* transformation matrix 驱动更稳定的 3D/2.5D 贴合（更像 AR）([Google AI for Developers][1])

---

# 11. 资源与模型管理（iOS 工程化）

## 11.1 模型文件必须在 App Bundle

iOS Setup Guide 指明：`.tflite` 模型文件应位于应用 bundle，并通过 `BaseOptions.modelAssetPath` 指定。([Google AI for Developers][3])

建议目录：

* `Resources/Models/face_landmarker.task`（或对应 tflite/task 文件）
* `Resources/Models/hand_landmarker.task`

## 11.2 头套资源

* 放入 Asset Catalog（PNG 透明背景）
* 每个头套带一份配置（额头偏移、缩放系数、旋转微调），方便不同图适配不同脸型

---

# 12. 隐私与合规（iOS 必备条款）

* `Info.plist` 加摄像头权限说明：`NSCameraUsageDescription`
* 默认不上传视频帧；埋点只上传事件数据（通过/失败/耗时/机型）
* 若未来录制：必须明确告知与授权（另开权限/弹窗策略）

---

# 13. 测试计划（iOS 版）

**机型覆盖（建议最少）**

* 低端：iPhone SE（近代款）/ iPhone 11
* 中高端：iPhone 13/14/15

**场景覆盖**

* 光照：背光、室内暗光
* 人脸：戴眼镜、低角度、侧脸
* 手势：握拳慢摇（不通过）、握拳快摇（通过）、张开手快晃（不通过）
* 丢失：人脸离开画面、手离开画面时状态提示与复位逻辑

---

# 14. 里程碑建议（iOS 落地顺序）

1. 相机采集（BGRA）+ preview 显示([Apple Developer][4])
2. FaceLandmarker liveStream 跑通（拿到 landmarks + blendshapes + matrices）([Google AI for Developers][1])
3. 头套 2D 叠加 + EMA 平滑（先别追求 3D）
4. TeethGate（mouthOpen/jawOpen + stableMs）
5. HandLandmarker liveStream + 握拳规则 + 晃动滑窗
6. 状态机串起来 + 积分/动效
7. 性能调优（降分辨率/降采样/丢帧策略）

---

如果你接下来要开始写 iOS 代码，我建议你直接以官方 iOS FaceLandmarker / HandLandmarker 的 liveStream 结构为骨架（delegate 异步回调那套），因为它对你这种“实时摄像头 + 特效叠加”就是最匹配的接口形态。([Google AI for Developers][1])

[1]: https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/ios?utm_source=chatgpt.com "Face landmark detection guide for iOS  |  Google AI Edge  |  Google AI for Developers"
[2]: https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/ios?utm_source=chatgpt.com "Hand landmarks detection guide for iOS  |  Google AI Edge  |  Google AI for Developers"
[3]: https://ai.google.dev/edge/mediapipe/solutions/setup_ios?utm_source=chatgpt.com "Setup guide for iOS  |  Google AI Edge  |  Google AI for Developers"
[4]: https://developer-rno.apple.com/library/archive/documentation/AudioVideo/Conceptual/AVFoundationPG/Articles/04_MediaCapture.html?utm_source=chatgpt.com "Still and Video Media Capture"
[5]: https://ai.google.dev/edge/api/mediapipe/swift/vision/Classes/HandLandmarkerResult?utm_source=chatgpt.com "MediaPipeTasksVision Framework Reference  |  Google AI Edge  |  Google AI for Developers"
[6]: https://fossies.org/dox/mediapipe-0.10.26/interfaceMPPFaceLandmarker.html?utm_source=chatgpt.com "mediapipe: MPPFaceLandmarker Class Reference - doxygen documentation | Fossies Dox"
[7]: https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/ios?hl=zh-TW&utm_source=chatgpt.com "iOS 專用臉部地標偵測指南  |  Google AI Edge  |  Google AI for Developers"
[8]: https://fossies.org/dox/mediapipe-0.10.26/interfaceMPPImage.html?utm_source=chatgpt.com "mediapipe: MPPImage Class Reference - doxygen documentation | Fossies Dox"
