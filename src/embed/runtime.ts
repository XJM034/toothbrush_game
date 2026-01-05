/**
 * BrushGame Embed Runtime
 *
 * 无 React 依赖的刷牙游戏引擎，可嵌入任何 HTML 页面。
 * 包装：摄像头启动、MediaPipe 初始化、检测循环、GameStateMachine、AvatarRenderer。
 */

import { FaceTracker } from '../mediapipe/FaceTracker';
import { HandTracker } from '../mediapipe/HandTracker';
import { GameStateMachine, GameState, GameStats, GameEvent } from '../core/game/GameStateMachine';
import { AvatarRenderer } from '../core/rendering/AvatarRenderer';
import { mediaPipeConfig } from '../config/mediapipe.config';
import { AvatarConfig, DetectionResult, FaceTrackingResult, HandTrackingResult } from '../types';

// ===== 类型定义 =====

export interface StartOptions {
  /** 渲染画布 */
  canvas: HTMLCanvasElement;
  /** 视频元素（可选，不提供则自动创建隐藏的） */
  video?: HTMLVideoElement;
  /** 头套 ID（用于查找预设配置） */
  avatarId?: string;
  /** 头套图片 URL（优先级高于 avatarId） */
  avatarUrl?: string;
  /** 头套配置（完整配置，优先级最高） */
  avatarConfig?: AvatarConfig;
  /** 游戏时长（毫秒），默认 60000 */
  gameDurationMs?: number;
  /** 状态变化回调 */
  onState?: (state: GameState, event: GameEvent) => void;
  /** 积分回调 */
  onScore?: (stats: GameStats, lastPoints: number) => void;
  /** 游戏结束回调 */
  onGameOver?: (stats: GameStats) => void;
  /** 错误回调 */
  onError?: (err: Error) => void;
  /** 初始化进度回调 */
  onProgress?: (stage: string, progress: number) => void;
  /** 是否显示调试信息 */
  debug?: boolean;
  /** 基础路径（用于头套图片等资源），默认为当前 origin */
  basePath?: string;
  /** 模型文件基础路径（单独配置，默认为 origin），用于 MediaPipe .task 文件 */
  modelBasePath?: string;
  /** 是否启用局内抓拍（默认 true） */
  enableCapture?: boolean;
  /** 抓拍数量（默认 6） */
  captureCount?: number;
  /** 抓拍回调（每次抓拍后触发） */
  onCapture?: (photo: string, index: number) => void;
}

export interface StopHandle {
  /** 停止游戏和检测循环 */
  stop: () => void;
  /** 获取当前游戏状态 */
  getState: () => GameState;
  /** 获取游戏统计 */
  getStats: () => GameStats;
  /** 获取剩余时间（毫秒） */
  getRemainingTime: () => number;
  /** 暂停检测（保留摄像头） */
  pause: () => void;
  /** 恢复检测 */
  resume: () => void;
  /** 获取已抓拍的照片（Base64 数组） */
  getCapturedPhotos: () => string[];
}

// ===== 默认头套配置 =====

const defaultAvatarConfigs: AvatarConfig[] = [
  {
    id: 'owl',
    name: '🦉 猫头鹰',
    imgUrl: 'SkinSet/owl.png',
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1.0
  },
  {
    id: 'cat',
    name: '🐱 猫咪',
    imgUrl: 'SkinSet/cat.png',
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1.0
  },
  {
    id: 'dog',
    name: '🐶 小狗',
    imgUrl: 'SkinSet/dog.png',
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1.0
  },
  {
    id: 'rabbit',
    name: '🐰 兔子',
    imgUrl: 'SkinSet/rabbit.png',
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1.0
  }
];

// ===== 辅助函数 =====

function getAvatarConfig(opts: StartOptions, basePath: string): AvatarConfig {
  // 优先级：avatarConfig > avatarUrl > avatarId > default
  if (opts.avatarConfig) {
    return opts.avatarConfig;
  }

  if (opts.avatarUrl) {
    return {
      id: 'custom',
      name: 'Custom Avatar',
      imgUrl: opts.avatarUrl,
      faceHoleOffset: { x: 0, y: 0.25 },
      anchorOffset: { x: 0, y: -0.15 },
      scale: 1.0
    };
  }

  const id = opts.avatarId || 'owl';
  const preset = defaultAvatarConfigs.find(a => a.id === id) || defaultAvatarConfigs[0];

  // 如果 imgUrl 不是绝对路径，则添加 basePath
  let imgUrl = preset.imgUrl;
  if (!imgUrl.startsWith('http') && !imgUrl.startsWith('/') && !imgUrl.startsWith('data:')) {
    imgUrl = basePath + '/' + imgUrl;
  }

  return { ...preset, imgUrl };
}

async function setupCamera(
  video: HTMLVideoElement,
  onProgress?: (stage: string, progress: number) => void
): Promise<MediaStream> {
  onProgress?.('camera', 0.1);

  const constraints: MediaStreamConstraints = {
    video: {
      facingMode: 'user',
      width: { ideal: 640 },
      height: { ideal: 480 }
    },
    audio: false
  };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  video.srcObject = stream;

  onProgress?.('camera', 0.5);

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Camera timeout: video failed to load within 15 seconds'));
    }, 15000);

    video.onloadedmetadata = () => {
      video.play().then(() => {
        clearTimeout(timeout);
        onProgress?.('camera', 1.0);
        resolve(stream);
      }).catch(reject);
    };

    video.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Video element error'));
    };
  });
}

// ===== 主函数 =====

export async function start(opts: StartOptions): Promise<StopHandle> {
  const { canvas, onState, onScore, onGameOver, onError, onProgress, debug = false } = opts;
  const basePath = opts.basePath || window.location.origin;
  const modelBasePath = opts.modelBasePath || window.location.origin; // 模型路径默认用 origin
  const gameDurationMs = opts.gameDurationMs || 60000;
  const enableCapture = opts.enableCapture !== false; // 默认启用
  const captureCount = opts.captureCount || 6;
  const onCapture = opts.onCapture;

  // 状态
  let isRunning = true;
  let isPaused = false;
  let animationFrameId: number | null = null;
  let stream: MediaStream | null = null;

  // 抓拍相关状态
  const capturedPhotos: string[] = [];
  let captureSchedule: number[] = []; // 抓拍时间点（相对于游戏开始的毫秒数）
  let nextCaptureIndex = 0;
  let gameStartTime = 0;

  // 组件
  const faceTracker = new FaceTracker();
  const handTracker = new HandTracker();
  const gameStateMachine = new GameStateMachine(gameDurationMs);
  const avatarRenderer = new AvatarRenderer();

  // 视频元素
  let video = opts.video;
  let createdVideo = false;
  if (!video) {
    video = document.createElement('video');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('autoplay', 'true');
    video.muted = true;
    video.style.display = 'none';
    document.body.appendChild(video);
    createdVideo = true;
  }

  // Canvas 上下文
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context from canvas');
  }

  // 获取头套配置
  const avatarConfig = getAvatarConfig(opts, basePath);

  // FPS 追踪
  let lastFrameTime = 0;
  let frameCount = 0;
  let fps = 0;
  let lastFpsUpdate = 0;

  // 检测帧率控制（20fps）
  const detectionInterval = 1000 / 20;
  let lastDetectionTime = 0;
  let lastFaceResult: FaceTrackingResult | null = null;
  let lastHandResult: HandTrackingResult | null = null;

  try {
    // 1. 启动摄像头
    onProgress?.('camera', 0);
    stream = await setupCamera(video, onProgress);

    // 2. 初始化 MediaPipe 模型
    onProgress?.('models', 0);

    // 构建模型路径（使用 modelBasePath，不是 basePath）
    const faceModelPath = modelBasePath + mediaPipeConfig.models.face;
    const handModelPath = modelBasePath + mediaPipeConfig.models.hand;

    await Promise.all([
      faceTracker.initialize(faceModelPath, mediaPipeConfig.wasmPath),
      handTracker.initialize(handModelPath, mediaPipeConfig.wasmPath)
    ]);
    onProgress?.('models', 1.0);

    // 3. 加载头套图片
    onProgress?.('avatar', 0);
    await avatarRenderer.loadAvatar(avatarConfig.imgUrl);
    onProgress?.('avatar', 1.0);

    // 4. 初始化游戏状态机
    gameStateMachine.initialize();

    // 设置事件监听
    gameStateMachine.addEventListener('state_changed', (event) => {
      onState?.(gameStateMachine.getState(), event);
    });

    gameStateMachine.addEventListener('brush_success', (event) => {
      const stats = gameStateMachine.getStats();
      const points = event.data?.points || 0;
      onScore?.(stats, points);
    });

    gameStateMachine.addEventListener('game_over', (event) => {
      const stats = event.data as GameStats;
      onGameOver?.(stats);
    });

    // 5. 初始化抓拍调度
    if (enableCapture) {
      // 生成 captureCount 个抓拍时间点
      // 避开游戏开始 3s 和结束前 5s，每次至少间隔 5s
      const safeStart = 3000; // 前 3s 不抓拍（给用户准备时间）
      const safeEnd = gameDurationMs - 5000; // 最后 5s 不抓拍
      const availableWindow = safeEnd - safeStart;
      const interval = Math.max(5000, availableWindow / (captureCount + 1));

      captureSchedule = [];
      for (let i = 0; i < captureCount; i++) {
        // 均分 + 随机抖动 (±1.5s)
        const baseTime = safeStart + interval * (i + 1);
        const jitter = (Math.random() - 0.5) * 3000; // -1.5s ~ +1.5s
        const captureTime = Math.max(safeStart, Math.min(safeEnd, baseTime + jitter));
        captureSchedule.push(captureTime);
      }
      // 按时间排序
      captureSchedule.sort((a, b) => a - b);
      console.log('[BrushGame] 抓拍调度:', captureSchedule.map(t => (t/1000).toFixed(1) + 's'));
    }
    gameStartTime = performance.now();

    // 6. 启动渲染循环
    function renderLoop(timestamp: number) {
      if (!isRunning) return;

      // FPS 计算
      frameCount++;
      if (timestamp - lastFpsUpdate >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFpsUpdate = timestamp;
      }

      const deltaMs = timestamp - lastFrameTime;
      lastFrameTime = timestamp;

      // 同步 canvas 尺寸
      if (canvas.width !== video!.videoWidth || canvas.height !== video!.videoHeight) {
        if (video!.videoWidth > 0 && video!.videoHeight > 0) {
          canvas.width = video!.videoWidth;
          canvas.height = video!.videoHeight;
        }
      }

      // 清空并绘制视频帧（水平镜像）
      ctx!.save();
      ctx!.translate(canvas.width, 0);
      ctx!.scale(-1, 1);
      ctx!.drawImage(video!, 0, 0, canvas.width, canvas.height);
      ctx!.restore();

      // 检测（降采样到 20fps）
      if (!isPaused && timestamp - lastDetectionTime >= detectionInterval) {
        lastDetectionTime = timestamp;

        // 执行检测
        lastFaceResult = faceTracker.detectForVideo(video!, timestamp);
        lastHandResult = handTracker.detectForVideo(video!, timestamp);

        const detectionResult: DetectionResult = {
          faceResult: lastFaceResult,
          handResult: lastHandResult
        };

        // 更新游戏状态
        gameStateMachine.update(detectionResult, deltaMs);
      }

      // 渲染头套（每帧，使用最新的检测结果）
      // 注意：视频已镜像，所以头套也需要在镜像坐标系下渲染
      if (lastFaceResult && lastFaceResult.landmarks) {
        ctx!.save();
        ctx!.translate(canvas.width, 0);
        ctx!.scale(-1, 1);
        avatarRenderer.render(ctx!, lastFaceResult, avatarConfig, canvas.width, canvas.height);
        ctx!.restore();
      }

      // 检查是否需要抓拍
      if (enableCapture && nextCaptureIndex < captureSchedule.length) {
        const elapsedMs = timestamp - gameStartTime;
        const nextCaptureTime = captureSchedule[nextCaptureIndex];

        if (elapsedMs >= nextCaptureTime) {
          // 执行抓拍
          try {
            // 创建临时 canvas 用于缩放（不超过 800px）
            const maxSize = 800;
            let targetWidth = canvas.width;
            let targetHeight = canvas.height;

            if (canvas.width > maxSize || canvas.height > maxSize) {
              const scale = maxSize / Math.max(canvas.width, canvas.height);
              targetWidth = Math.round(canvas.width * scale);
              targetHeight = Math.round(canvas.height * scale);
            }

            const captureCanvas = document.createElement('canvas');
            captureCanvas.width = targetWidth;
            captureCanvas.height = targetHeight;
            const captureCtx = captureCanvas.getContext('2d');

            if (captureCtx) {
              captureCtx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
              const photoData = captureCanvas.toDataURL('image/jpeg', 0.85);
              capturedPhotos.push(photoData);

              console.log(`[BrushGame] 抓拍 ${nextCaptureIndex + 1}/${captureCount} @ ${(elapsedMs/1000).toFixed(1)}s`);
              onCapture?.(photoData, nextCaptureIndex);
            }
          } catch (e) {
            console.error('[BrushGame] 抓拍失败:', e);
          }

          nextCaptureIndex++;
        }
      }

      // 调试信息
      if (debug) {
        renderDebugInfo(ctx!, canvas, lastFaceResult, lastHandResult, fps, gameStateMachine);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    }

    onProgress?.('ready', 1.0);
    animationFrameId = requestAnimationFrame(renderLoop);

  } catch (error) {
    cleanup();
    const err = error instanceof Error ? error : new Error(String(error));
    onError?.(err);
    throw err;
  }

  // 清理函数
  function cleanup() {
    isRunning = false;

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    if (createdVideo && video) {
      video.remove();
    }

    faceTracker.dispose();
    handTracker.dispose();
    avatarRenderer.dispose();
  }

  // 返回控制句柄
  return {
    stop: cleanup,
    getState: () => gameStateMachine.getState(),
    getStats: () => gameStateMachine.getStats(),
    getRemainingTime: () => gameStateMachine.getRemainingTime(),
    pause: () => { isPaused = true; },
    resume: () => { isPaused = false; },
    getCapturedPhotos: () => [...capturedPhotos] // 返回副本
  };
}

// ===== 调试渲染 =====

function renderDebugInfo(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  faceResult: FaceTrackingResult | null,
  handResult: HandTrackingResult | null,
  fps: number,
  gameStateMachine: GameStateMachine
) {
  ctx.save();

  // 半透明背景
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(10, 10, 200, 120);

  // 文字样式
  ctx.fillStyle = '#fff';
  ctx.font = '12px monospace';

  const state = gameStateMachine.getState();
  const stats = gameStateMachine.getStats();
  const remaining = Math.ceil(gameStateMachine.getRemainingTime() / 1000);

  ctx.fillText(`FPS: ${fps}`, 20, 30);
  ctx.fillText(`State: ${state}`, 20, 46);
  ctx.fillText(`Score: ${stats.score}`, 20, 62);
  ctx.fillText(`Success: ${stats.successCount}`, 20, 78);
  ctx.fillText(`Time: ${remaining}s`, 20, 94);
  ctx.fillText(`Face: ${faceResult?.landmarks ? 'Yes' : 'No'}`, 20, 110);
  ctx.fillText(`Hand: ${handResult?.landmarks ? 'Yes' : 'No'}`, 120, 110);

  // 绘制人脸关键点
  if (faceResult?.landmarks) {
    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    for (const lm of faceResult.landmarks) {
      const x = (1 - lm.x) * canvas.width; // 镜像
      const y = lm.y * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 绘制手部关键点
  if (handResult?.landmarks) {
    ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
    for (const lm of handResult.landmarks) {
      const x = (1 - lm.x) * canvas.width; // 镜像
      const y = lm.y * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

// ===== 导出配置 =====

export const config = {
  avatars: defaultAvatarConfigs,
  mediaPipe: mediaPipeConfig
};

// ===== 导出类型 =====

export type { GameState, GameStats, GameEvent, AvatarConfig };
