// 露出牙齿检测器 - 检测用户露出牙齿的姿态
import { FaceTrackingResult } from '../../types';

export interface TeethGateResult {
  isOpen: boolean;  // 是否露出牙齿
  jawOpenScore: number;  // jawOpen blendshape 分数
  mouthOpenScore: number;  // mouthOpen blendshape 分数
  confidence: number;  // 置信度 (0-1)
}

export class TeethGate {
  // 配置参数
  private jawOpenThreshold = 0.3;  // jawOpen > 0.3 表示嘴巴打开
  private mouthOpenThreshold = 0.15;  // mouthOpen > 0.15 表示嘴巴有显著打开
  private stableFrames = 0;  // 需要连续保持打开的帧数
  private requiredStableFrames = 8;  // 需要 ~250ms (8 frames @ 30fps)

  constructor(
    jawOpenThreshold = 0.3,
    mouthOpenThreshold = 0.15,
    stableMs = 250,
    detectionFps = 30
  ) {
    this.jawOpenThreshold = jawOpenThreshold;
    this.mouthOpenThreshold = mouthOpenThreshold;
    this.requiredStableFrames = Math.ceil((stableMs / 1000) * detectionFps);
  }

  /**
   * 检测露出牙齿的姿态
   */
  detect(faceResult: FaceTrackingResult): TeethGateResult {
    const jawOpen = faceResult.blendshapes?.get('jawOpen') ?? 0;
    const mouthOpen = faceResult.blendshapes?.get('mouthOpen') ?? 0;

    // 检查条件：jawOpen 打开 且 mouthOpen 也打开
    const isCurrentlyOpen =
      jawOpen >= this.jawOpenThreshold &&
      mouthOpen >= this.mouthOpenThreshold;

    // 更新稳定性计数
    if (isCurrentlyOpen) {
      this.stableFrames++;
    } else {
      this.stableFrames = 0;
    }

    // 判断是否达到稳定的露出牙齿状态
    const isOpen = this.stableFrames >= this.requiredStableFrames;

    // 计算置信度（基于分数和稳定性）
    const scoreConfidence = Math.min(
      (jawOpen - this.jawOpenThreshold) * 2,
      (mouthOpen - this.mouthOpenThreshold) * 3.33,
      1
    );
    const stabilityConfidence = Math.min(
      this.stableFrames / this.requiredStableFrames,
      1
    );
    const confidence = Math.min(scoreConfidence * stabilityConfidence, 1);

    return {
      isOpen,
      jawOpenScore: jawOpen,
      mouthOpenScore: mouthOpen,
      confidence
    };
  }

  /**
   * 重置状态
   */
  reset(): void {
    this.stableFrames = 0;
  }

  /**
   * 获取稳定度（用于调试）
   */
  getStability(): number {
    return Math.min(this.stableFrames / this.requiredStableFrames, 1);
  }

  /**
   * 设置参数
   */
  setThresholds(
    jawOpenThreshold: number,
    mouthOpenThreshold: number,
    stableMs: number,
    detectionFps: number = 30
  ): void {
    this.jawOpenThreshold = jawOpenThreshold;
    this.mouthOpenThreshold = mouthOpenThreshold;
    this.requiredStableFrames = Math.ceil((stableMs / 1000) * detectionFps);
    this.reset();
  }
}
