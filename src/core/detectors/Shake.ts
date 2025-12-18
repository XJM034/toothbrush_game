// 摇晃检测器 - 检测手部是否在快速摇晃
import { HandTrackingResult } from '../../types';
import { distance } from '../utils/geometry';

export interface ShakeResult {
  isShaking: boolean;  // 是否在摇晃
  currentSpeed: number;  // 当前速度 (像素/帧)
  avgSpeed: number;  // 平均速度
  highSpeedRatio: number;  // 高速比例 (0-1)
  confidence: number;  // 置信度
}

export class Shake {
  // 摇晃检测参数
  private speedThreshold = 0.02;  // 速度阈值（相对于视频尺寸）
  private windowMs = 500;  // 时间窗口
  private highSpeedRatio = 0.15;  // 需要有 15% 的时间在高速运动
  private stableFrames = 0;
  private requiredStableFrames = 4;  // ~133ms @ 30fps

  // 速度历史记录（用于计算平均速度）
  private speedHistory: number[] = [];
  private maxHistorySize = 15;  // 500ms @ 30fps ≈ 15 帧

  // 前一帧的手部位置
  private prevHandPos: { x: number; y: number } | null = null;

  constructor(
    speedThreshold = 0.02,
    windowMs = 500,
    highSpeedRatio = 0.15,
    stableMs = 133,
    detectionFps = 30
  ) {
    this.speedThreshold = speedThreshold;
    this.windowMs = windowMs;
    this.highSpeedRatio = highSpeedRatio;
    this.maxHistorySize = Math.ceil((windowMs / 1000) * detectionFps);
    this.requiredStableFrames = Math.ceil((stableMs / 1000) * detectionFps);
  }

  /**
   * 检测摇晃状态
   */
  detect(
    handResult: HandTrackingResult,
    canvasWidth: number = 640,
    canvasHeight: number = 480
  ): ShakeResult {
    if (!handResult.landmarks || handResult.landmarks.length < 9) {
      return {
        isShaking: false,
        currentSpeed: 0,
        avgSpeed: 0,
        highSpeedRatio: 0,
        confidence: 0
      };
    }

    // 使用手掌中心（索引 9）来追踪手部
    const currentHandPos = handResult.landmarks[9];
    const canvasPos = {
      x: currentHandPos.x * canvasWidth,
      y: currentHandPos.y * canvasHeight
    };

    let currentSpeed = 0;

    // 计算当前速度（如果有前一帧的位置）
    if (this.prevHandPos) {
      const pixelDistance = distance(this.prevHandPos, canvasPos);
      // 规范化速度（相对于视频尺寸）
      currentSpeed = pixelDistance / Math.sqrt(canvasWidth * canvasHeight);
    }

    // 保存当前位置为下一帧的前一帧
    this.prevHandPos = { ...canvasPos };

    // 更新速度历史
    this.speedHistory.push(currentSpeed);
    if (this.speedHistory.length > this.maxHistorySize) {
      this.speedHistory.shift();
    }

    // 计算平均速度
    const avgSpeed =
      this.speedHistory.length > 0
        ? this.speedHistory.reduce((a, b) => a + b, 0) /
          this.speedHistory.length
        : 0;

    // 计算高速比例
    const highSpeedCount = this.speedHistory.filter(
      (s) => s > this.speedThreshold
    ).length;
    const currentHighSpeedRatio =
      this.speedHistory.length > 0
        ? highSpeedCount / this.speedHistory.length
        : 0;

    // 摇晃判断：高速比例 > 阈值
    const isCurrentlyShaking = currentHighSpeedRatio > this.highSpeedRatio;

    // 更新稳定性
    if (isCurrentlyShaking) {
      this.stableFrames++;
    } else {
      this.stableFrames = 0;
    }

    const isShaking = this.stableFrames >= this.requiredStableFrames;

    // 计算置信度
    const speedConfidence = Math.min(
      currentSpeed / (this.speedThreshold * 2),
      1
    );
    const ratioConfidence = Math.max(
      0,
      (currentHighSpeedRatio - this.highSpeedRatio) /
        (1 - this.highSpeedRatio)
    );
    const stabilityConfidence = Math.min(
      this.stableFrames / this.requiredStableFrames,
      1
    );

    const confidence = Math.min(
      speedConfidence * ratioConfidence * stabilityConfidence,
      1
    );

    return {
      isShaking,
      currentSpeed,
      avgSpeed,
      highSpeedRatio: currentHighSpeedRatio,
      confidence
    };
  }

  /**
   * 重置状态
   */
  reset(): void {
    this.stableFrames = 0;
    this.speedHistory = [];
    this.prevHandPos = null;
  }

  /**
   * 获取稳定度
   */
  getStability(): number {
    return Math.min(this.stableFrames / this.requiredStableFrames, 1);
  }
}
