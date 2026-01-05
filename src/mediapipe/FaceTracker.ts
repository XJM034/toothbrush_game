// 人脸追踪器 - 封装 MediaPipe FaceLandmarker
import {
  FaceLandmarker,
  FilesetResolver,
  type FaceLandmarkerResult
} from '@mediapipe/tasks-vision';

import { FaceTrackingResult } from '../types';
import { smoothPoint, smoothScalar, Point } from '../core/utils/smoothing';
import { getFaceTransformFromLandmarks } from '../core/utils/geometry';
import { mediaPipeConfig } from '../config';

export class FaceTracker {
  private faceLandmarker: FaceLandmarker | null = null;
  private isInitialized = false;
  private lastResult: FaceTrackingResult | null = null;

  // 平滑状态
  private smoothedCenter: Point = { x: 0, y: 0 };
  private smoothedScale = 1;
  private smoothedRotation = 0;
  private smoothingAlpha = 0.3;

  /**
   * 初始化 FaceLandmarker
   */
  async initialize(
    modelPath: string,
    wasmPath?: string,
    smoothingAlpha?: number
  ): Promise<void> {
    try {
      console.log('[FaceTracker] 初始化中...');

      if (smoothingAlpha !== undefined) {
        this.smoothingAlpha = smoothingAlpha;
      }

      // 解析 WASM 文件集合
      const wasmUrl = wasmPath || mediaPipeConfig.wasmPath;
      const filesetResolver = await FilesetResolver.forVisionTasks(wasmUrl);

      console.log('[FaceTracker] WASM 已加载');

      // 创建 FaceLandmarker
      const faceOptions = {
        baseOptions: {
          modelAssetPath: modelPath
        },
        runningMode: 'VIDEO' as const,
        ...mediaPipeConfig.faceOptions
      };
      this.faceLandmarker = await FaceLandmarker.createFromOptions(
        filesetResolver,
        faceOptions
      );

      console.log('[FaceTracker] FaceLandmarker 初始化完成');
      this.isInitialized = true;
    } catch (error) {
      console.error('[FaceTracker] 初始化失败:', error);
      throw error;
    }
  }

  /**
   * 检测视频帧中的人脸
   */
  detectForVideo(
    video: HTMLVideoElement,
    timestamp: number
  ): FaceTrackingResult {
    if (!this.faceLandmarker || !this.isInitialized) {
      return this.getEmptyResult(timestamp);
    }

    try {
      // 检查视频状态
      if (video.readyState < video.HAVE_CURRENT_DATA) {
        return this.getEmptyResult(timestamp);
      }

      // 执行人脸检测
      const results: FaceLandmarkerResult = this.faceLandmarker.detectForVideo(
        video,
        timestamp
      );

      // 检查是否检测到人脸
      if (!results.faceLandmarks || results.faceLandmarks.length === 0) {
        return this.getEmptyResult(timestamp);
      }

      // 提取第一张脸（numFaces: 1）
      const landmarks = results.faceLandmarks[0];
      const blendshapes = this.extractBlendshapes(results);

      // 计算头套定位参数
      const canvasWidth = video.videoWidth || 640;
      const canvasHeight = video.videoHeight || 480;

      const transform = getFaceTransformFromLandmarks(
        landmarks,
        canvasWidth,
        canvasHeight
      );

      // 应用 EMA 平滑
      this.smoothedCenter = smoothPoint(
        this.smoothedCenter,
        transform.center,
        this.smoothingAlpha
      );
      this.smoothedScale = smoothScalar(
        this.smoothedScale,
        transform.scale,
        this.smoothingAlpha
      );
      this.smoothedRotation = smoothScalar(
        this.smoothedRotation,
        transform.rotation,
        this.smoothingAlpha
      );

      const result: FaceTrackingResult = {
        landmarks,
        blendshapes,
        faceCenter: this.smoothedCenter,
        faceScale: this.smoothedScale,
        faceRotation: this.smoothedRotation,
        timestamp
      };

      this.lastResult = result;
      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error('[FaceTracker] 检测失败:', errorMsg, error);
      return this.lastResult || this.getEmptyResult(timestamp);
    }
  }

  /**
   * 从检测结果中提取 Blendshapes
   */
  private extractBlendshapes(
    result: FaceLandmarkerResult
  ): Map<string, number> | null {
    if (!result.faceBlendshapes || result.faceBlendshapes.length === 0) {
      return null;
    }

    const blendshapeMap = new Map<string, number>();
    const faceBlendshapes = result.faceBlendshapes[0];

    faceBlendshapes.categories.forEach(category => {
      blendshapeMap.set(category.categoryName, category.score);
    });

    return blendshapeMap;
  }

  /**
   * 获取空结果
   */
  private getEmptyResult(timestamp: number): FaceTrackingResult {
    return {
      landmarks: null,
      blendshapes: null,
      faceCenter: this.smoothedCenter,
      faceScale: this.smoothedScale,
      faceRotation: this.smoothedRotation,
      timestamp
    };
  }

  /**
   * 重置状态
   */
  reset(): void {
    this.lastResult = null;
    this.smoothedCenter = { x: 0, y: 0 };
    this.smoothedScale = 1;
    this.smoothedRotation = 0;
  }

  /**
   * 释放资源
   */
  dispose(): void {
    if (this.faceLandmarker) {
      this.faceLandmarker.close?.();
      this.faceLandmarker = null;
    }
    this.isInitialized = false;
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}
