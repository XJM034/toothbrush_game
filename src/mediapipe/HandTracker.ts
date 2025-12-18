// 手部追踪器 - 封装 MediaPipe HandLandmarker
import {
  HandLandmarker,
  FilesetResolver,
  type HandLandmarkerResult
} from '@mediapipe/tasks-vision';

import { HandTrackingResult, NormalizedLandmark, WorldLandmark } from '../types';
import { mediaPipeConfig } from '../config';

export class HandTracker {
  private handLandmarker: HandLandmarker | null = null;
  private isInitialized = false;
  private lastResult: HandTrackingResult | null = null;

  // 稳定性追踪：连续检测到手的帧数
  private handDetectedFrames = 0;
  private minStableFrames = 3; // 至少 3 帧才认为是稳定的

  /**
   * 初始化 HandLandmarker
   */
  async initialize(
    modelPath: string,
    wasmPath?: string
  ): Promise<void> {
    try {
      console.log('[HandTracker] 初始化中...');

      // 解析 WASM 文件集合
      const wasmUrl = wasmPath || mediaPipeConfig.wasmPath;
      const filesetResolver = await FilesetResolver.forVisionTasks(wasmUrl);

      console.log('[HandTracker] WASM 已加载');

      // 创建 HandLandmarker
      const handOptions = {
        baseOptions: {
          modelAssetPath: modelPath
        },
        runningMode: 'VIDEO' as const,
        ...mediaPipeConfig.handOptions
      };
      this.handLandmarker = await HandLandmarker.createFromOptions(
        filesetResolver,
        handOptions
      );

      console.log('[HandTracker] HandLandmarker 初始化完成');
      this.isInitialized = true;
    } catch (error) {
      console.error('[HandTracker] 初始化失败:', error);
      throw error;
    }
  }

  /**
   * 检测视频帧中的手部
   */
  detectForVideo(
    video: HTMLVideoElement,
    timestamp: number
  ): HandTrackingResult {
    if (!this.handLandmarker || !this.isInitialized) {
      return this.getEmptyResult(timestamp);
    }

    try {
      // 检查视频状态
      if (video.readyState < video.HAVE_CURRENT_DATA) {
        return this.getEmptyResult(timestamp);
      }

      // 执行手部检测
      const results: HandLandmarkerResult = this.handLandmarker.detectForVideo(
        video,
        timestamp
      );

      // 检查是否检测到手
      if (!results.landmarks || results.landmarks.length === 0) {
        this.handDetectedFrames = 0;
        return this.getEmptyResult(timestamp);
      }

      // 更新稳定性计数
      this.handDetectedFrames++;

      // 提取第一只手（numHands: 1）
      const landmarks = results.landmarks[0];
      const worldLandmarks = results.worldLandmarks?.[0] || null;
      // Extract handedness (Left or Right)
      let handedness: string | null = null;
      if (results.handedness && results.handedness.length > 0) {
        const firstHandedness = results.handedness[0] as any;
        if (firstHandedness.displayName) {
          handedness = firstHandedness.displayName;
        } else if (Array.isArray(firstHandedness) && firstHandedness[0]?.categoryName) {
          handedness = firstHandedness[0].categoryName;
        }
      }

      const result: HandTrackingResult = {
        landmarks,
        worldLandmarks,
        handedness,
        timestamp
      };

      this.lastResult = result;
      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error('[HandTracker] 检测失败:', errorMsg, error);
      this.handDetectedFrames = 0;
      return this.lastResult || this.getEmptyResult(timestamp);
    }
  }

  /**
   * 获取空结果
   */
  private getEmptyResult(timestamp: number): HandTrackingResult {
    return {
      landmarks: null,
      worldLandmarks: null,
      handedness: null,
      timestamp
    };
  }

  /**
   * 检查手部是否稳定检测到
   */
  isHandStable(): boolean {
    return this.handDetectedFrames >= this.minStableFrames;
  }

  /**
   * 获取连续检测到手的帧数
   */
  getHandDetectedFrames(): number {
    return this.handDetectedFrames;
  }

  /**
   * 重置状态
   */
  reset(): void {
    this.lastResult = null;
    this.handDetectedFrames = 0;
  }

  /**
   * 释放资源
   */
  dispose(): void {
    if (this.handLandmarker) {
      this.handLandmarker.close?.();
      this.handLandmarker = null;
    }
    this.isInitialized = false;
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}
