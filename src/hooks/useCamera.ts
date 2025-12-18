// 摄像头管理 Hook
import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseCameraOptions {
  width?: number;
  height?: number;
  frameRate?: number;
  facingMode?: 'user' | 'environment';
}

export const useCamera = (options: UseCameraOptions = {}) => {
  const {
    width = 640,
    height = 480,
    frameRate = 30,
    facingMode = 'user'
  } = options;

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 启动摄像头
   */
  const startCamera = useCallback(async () => {
    if (!videoRef.current) {
      setError('视频元素未找到');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // 检查浏览器支持
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('浏览器不支持摄像头访问');
      }

      // 请求摄像头权限
      // 注意：必须直接调用以保持正确的 'this' 上下文
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: width },
          height: { ideal: height },
          frameRate: { ideal: frameRate },
          facingMode
        },
        audio: false
      });

      streamRef.current = mediaStream;

      // 将流绑定到 video 元素
      videoRef.current.srcObject = mediaStream;

      console.log('[useCamera] 流已绑定到 video 元素');

      // 等待 video 元素加载
      await new Promise((resolve, reject) => {
        let resolved = false;
        const timeout = setTimeout(() => {
          if (!resolved) {
            resolved = true;
            console.warn('[useCamera] 视频加载超时，但仍然继续（readyState:', videoRef.current?.readyState, ')');
            // 不拒绝，继续进行 - 某些系统加载较慢
            resolve(null);
          }
        }, 15000);

        const onLoadedMetadata = () => {
          if (resolved) return;
          resolved = true;
          console.log('[useCamera] Video loadedmetadata 事件触发', {
            videoWidth: videoRef.current?.videoWidth,
            videoHeight: videoRef.current?.videoHeight
          });
          clearTimeout(timeout);
          cleanup();
          resolve(null);
        };

        const onError = (error: Event | string) => {
          if (resolved) return;
          resolved = true;
          console.error('[useCamera] Video 错误事件:', error);
          clearTimeout(timeout);
          cleanup();
          reject(new Error(String(error)));
        };

        const cleanup = () => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = null;
            videoRef.current.onerror = null;
            videoRef.current.oncanplay = null;
          }
        };

        // 同时监听 canplay 和 loadedmetadata
        const onCanPlay = () => {
          if (resolved) return;
          if (videoRef.current && videoRef.current.videoWidth > 0) {
            resolved = true;
            console.log('[useCamera] Video canplay 事件触发');
            clearTimeout(timeout);
            cleanup();
            resolve(null);
          }
        };

        if (videoRef.current) {
          videoRef.current.onloadedmetadata = onLoadedMetadata;
          videoRef.current.onerror = onError;
          videoRef.current.oncanplay = onCanPlay;
        }
      });

      // 播放视频
      console.log('[useCamera] 正在播放视频...');
      try {
        await videoRef.current.play();
        console.log('[useCamera] 视频播放成功');
      } catch (playError) {
        console.error('[useCamera] 视频播放失败:', playError);
        throw playError;
      }

      console.log('[useCamera] 摄像头已启动');
      setIsReady(true);
      setIsLoading(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '启动摄像头失败';

      console.error('[useCamera] 错误:', errorMessage, err);
      setError(errorMessage);
      setIsLoading(false);

      // 清理资源
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  }, [width, height, frameRate, facingMode]);

  /**
   * 停止摄像头
   */
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsReady(false);
    console.log('[useCamera] 摄像头已停止');
  }, []);

  /**
   * 清理资源
   */
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    stream: streamRef.current,
    isReady,
    isLoading,
    error,
    startCamera,
    stopCamera
  };
};
