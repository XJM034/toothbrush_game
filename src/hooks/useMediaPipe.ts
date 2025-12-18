// MediaPipe 初始化和推理循环管理 Hook
import { useEffect, useRef, useState, useCallback } from 'react';
import { FaceTracker } from '../mediapipe/FaceTracker';
import { HandTracker } from '../mediapipe/HandTracker';
import { DetectionResult } from '../types';
import { mediaPipeConfig } from '../config';

export interface UseMediaPipeOptions {
  videoRef: React.RefObject<HTMLVideoElement>;
  onDetection?: (result: DetectionResult) => void;
  smoothingAlpha?: number;
}

export const useMediaPipe = ({
  videoRef,
  onDetection,
  smoothingAlpha = 0.3
}: UseMediaPipeOptions) => {
  const faceTrackerRef = useRef<FaceTracker | null>(null);
  const handTrackerRef = useRef<HandTracker | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  /**
   * 初始化 MediaPipe 模型
   */
  const initialize = useCallback(async () => {
    if (isInitialized) return;

    try {
      setIsInitializing(true);
      setError(null);

      console.log('[useMediaPipe] 初始化 MediaPipe...');

      // 并行初始化两个模型
      const faceTracker = new FaceTracker();
      const handTracker = new HandTracker();

      await Promise.all([
        faceTracker.initialize(
          mediaPipeConfig.models.face,
          mediaPipeConfig.wasmPath,
          smoothingAlpha
        ),
        handTracker.initialize(
          mediaPipeConfig.models.hand,
          mediaPipeConfig.wasmPath
        )
      ]);

      faceTrackerRef.current = faceTracker;
      handTrackerRef.current = handTracker;

      console.log('[useMediaPipe] MediaPipe 初始化完成');
      setIsInitialized(true);
      setIsInitializing(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'MediaPipe 初始化失败';
      console.error('[useMediaPipe] 初始化错误:', errorMessage, err);
      setError(errorMessage);
      setIsInitializing(false);
    }
  }, [isInitialized, smoothingAlpha]);

  /**
   * 推理循环
   */
  const runDetectionLoop = useCallback(() => {
    if (
      !videoRef.current ||
      !faceTrackerRef.current ||
      !handTrackerRef.current ||
      !isInitialized
    ) {
      return;
    }

    try {
      const video = videoRef.current;

      // 检查视频是否准备好
      if (video.readyState !== video.HAVE_ENOUGH_DATA) {
        animationFrameRef.current = requestAnimationFrame(runDetectionLoop);
        return;
      }

      const timestamp = performance.now();

      // 执行检测
      const faceResult = faceTrackerRef.current.detectForVideo(
        video,
        timestamp
      );
      const handResult = handTrackerRef.current.detectForVideo(
        video,
        timestamp
      );

      // 调用回调
      if (onDetection) {
        onDetection({
          faceResult,
          handResult
        });
      }

      // 继续循环
      animationFrameRef.current = requestAnimationFrame(runDetectionLoop);
    } catch (error) {
      console.error('[useMediaPipe] 检测循环错误:', error);
      animationFrameRef.current = requestAnimationFrame(runDetectionLoop);
    }
  }, [videoRef, isInitialized, onDetection]);

  /**
   * 启动推理循环
   */
  const startDetection = useCallback(() => {
    if (!isInitialized) {
      console.warn('[useMediaPipe] MediaPipe 未初始化，无法启动检测循环');
      return;
    }

    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(runDetectionLoop);
      console.log('[useMediaPipe] 推理循环已启动');
    }
  }, [isInitialized, runDetectionLoop]);

  /**
   * 停止推理循环
   */
  const stopDetection = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      console.log('[useMediaPipe] 推理循环已停止');
    }
  }, []);

  /**
   * 自动初始化 MediaPipe
   */
  useEffect(() => {
    if (!isInitialized && !isInitializing) {
      initialize();
    }
  }, [isInitialized, isInitializing, initialize]);

  /**
   * 清理资源
   */
  useEffect(() => {
    return () => {
      stopDetection();
      faceTrackerRef.current?.dispose();
      handTrackerRef.current?.dispose();
    };
  }, [stopDetection]);

  return {
    isInitialized,
    isInitializing,
    error,
    faceTracker: faceTrackerRef.current,
    handTracker: handTrackerRef.current,
    initialize,
    startDetection,
    stopDetection
  };
};
