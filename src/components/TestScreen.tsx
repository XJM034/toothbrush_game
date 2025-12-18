// 测试屏幕 - 验证摄像头和 MediaPipe 集成
import { useEffect, useRef, useState, useCallback } from 'react';
import { useCamera } from '../hooks/useCamera';
import { useMediaPipe } from '../hooks/useMediaPipe';
import { DetectionResult } from '../types';

interface DetectionStats {
  faceDetected: boolean;
  handDetected: boolean;
  jawOpen: number;
  fps: number;
  videoWidth: number;
  videoHeight: number;
}

export const TestScreen: React.FC = () => {
  const { videoRef, isReady, error: cameraError, startCamera, stopCamera } =
    useCamera();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectionStats, setDetectionStats] = useState<DetectionStats>({
    faceDetected: false,
    handDetected: false,
    jawOpen: 0,
    fps: 0,
    videoWidth: 640,
    videoHeight: 480
  });
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  // 定义检测处理函数
  const handleDetection = useCallback((result: DetectionResult) => {
    frameCountRef.current++;

    const now = performance.now();
    if (now - lastTimeRef.current >= 1000) {
      const fps = frameCountRef.current;
      frameCountRef.current = 0;
      lastTimeRef.current = now;

      setDetectionStats(prev => ({
        ...prev,
        fps
      }));
    }

    const faceDetected = result.faceResult.landmarks !== null;
    const handDetected = result.handResult.landmarks !== null;
    const jawOpen = result.faceResult.blendshapes?.get('jawOpen') ?? 0;

    // 更新统计信息
    setDetectionStats(prev => ({
      ...prev,
      faceDetected,
      handDetected,
      jawOpen,
      videoWidth: videoRef.current?.videoWidth ?? 640,
      videoHeight: videoRef.current?.videoHeight ?? 480
    }));

    // 绘制视频和关键点
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      // 调试：检查 video 元素状态
      if (frameCountRef.current === 1) {
        console.log('[TestScreen] Video 元素状态:', {
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight,
          readyState: video.readyState,
          paused: video.paused,
          srcObject: !!video.srcObject,
          networkState: video.networkState
        });
      }

      // 同步 canvas 大小与 video
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // 清空画布
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制视频帧
        try {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        } catch (error) {
          console.error('[TestScreen] 绘制视频失败:', error);
          // 继续绘制调试信息，即使绘制失败
        }

        // 绘制人脸关键点
        if (faceDetected && result.faceResult.landmarks) {
          ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
          ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
          ctx.lineWidth = 1;

          result.faceResult.landmarks.forEach((landmark, idx) => {
            const x = landmark.x * canvas.width;
            const y = landmark.y * canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fill();

            // 每10个点连一条线，形成网格效果
            if (idx > 0 && idx % 10 === 0) {
              const prevLandmark = result.faceResult.landmarks![idx - 1];
              const px = prevLandmark.x * canvas.width;
              const py = prevLandmark.y * canvas.height;
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(x, y);
              ctx.stroke();
            }
          });
        }

        // 绘制手部关键点
        if (handDetected && result.handResult.landmarks) {
          ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
          ctx.lineWidth = 2;

          result.handResult.landmarks.forEach((landmark, idx) => {
            const x = landmark.x * canvas.width;
            const y = landmark.y * canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();

            // 连接相邻关键点（手指）
            if (
              result.handResult.landmarks &&
              ((idx > 0 && idx % 4 === 0) || // 手指关节连接
                idx === 9 ||
                idx === 13 ||
                idx === 17)
            ) {
              const prevIdx = idx - 1;
              if (
                prevIdx >= 0 &&
                prevIdx < result.handResult.landmarks.length
              ) {
                const prevLandmark = result.handResult.landmarks[prevIdx];
                const px = prevLandmark.x * canvas.width;
                const py = prevLandmark.y * canvas.height;
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(x, y);
                ctx.stroke();
              }
            }
          });
        }

        // 绘制文本信息
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(10, 10, 250, 100);

        ctx.fillStyle = '#0f0';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(`FPS: ${detectionStats.fps}`, 20, 30);
        ctx.fillText(`Face: ${faceDetected ? '✓' : '✗'}`, 20, 50);
        ctx.fillText(`Hand: ${handDetected ? '✓' : '✗'}`, 20, 70);
        ctx.fillText(`Jaw Open: ${jawOpen.toFixed(2)}`, 20, 90);
      }
    }
  }, [videoRef, detectionStats.fps]);

  // 使用 MediaPipe
  const { isInitialized, error: mediaError, startDetection, stopDetection } =
    useMediaPipe({
      videoRef,
      onDetection: handleDetection
    });

  // 处理启动
  useEffect(() => {
    if (isReady) {
      console.log('[TestScreen] 摄像头已准备好，启动检测');
      startDetection();
      return () => {
        stopDetection();
      };
    }
  }, [isReady, startDetection, stopDetection]);

  const handleStartClick = async () => {
    console.log('[TestScreen] 点击启动摄像头');
    await startCamera();
  };

  const handleStopClick = () => {
    console.log('[TestScreen] 点击停止');
    stopDetection();
    stopCamera();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        fontFamily: 'monospace',
        padding: '20px',
        gap: '20px'
      }}
    >
      <h1>🎮 刷牙游戏 - 功能测试</h1>

      {/* 错误显示 */}
      {(cameraError || mediaError) && (
        <div
          style={{
            backgroundColor: '#ff4444',
            padding: '15px',
            borderRadius: '5px',
            maxWidth: '600px',
            textAlign: 'center'
          }}
        >
          <p>
            <strong>❌ 错误:</strong> {cameraError || mediaError}
          </p>
        </div>
      )}

      {/* 控制按钮 */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleStartClick}
          disabled={isReady}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            cursor: isReady ? 'not-allowed' : 'pointer',
            opacity: isReady ? 0.5 : 1,
            backgroundColor: isReady ? '#666' : '#0f0',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          启动摄像头
        </button>
        <button
          onClick={handleStopClick}
          disabled={!isReady}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            cursor: !isReady ? 'not-allowed' : 'pointer',
            opacity: !isReady ? 0.5 : 1,
            backgroundColor: !isReady ? '#666' : '#f00',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          停止
        </button>
      </div>

      {/* 状态信息 */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#333',
          borderRadius: '5px',
          textAlign: 'center'
        }}
      >
        <p>摄像头: {isReady ? '✓ 已启动' : '✗ 未启动'}</p>
        <p>MediaPipe: {isInitialized ? '✓ 已初始化' : '⏳ 初始化中...'}</p>
        <p>人脸检测: {detectionStats.faceDetected ? '✓ 是' : '✗ 否'}</p>
        <p>手部检测: {detectionStats.handDetected ? '✓ 是' : '✗ 否'}</p>
        <p>张嘴分数: {detectionStats.jawOpen.toFixed(2)}</p>
        <p>FPS: {detectionStats.fps}</p>
      </div>

      {/* 视频和 Canvas */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -1
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: 'auto',
            border: '3px solid #0f0',
            borderRadius: '5px',
            backgroundColor: '#000',
            display: 'block'
          }}
        />
      </div>

      <div style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
        <p>🟢 绿色点: 人脸关键点 (468个)</p>
        <p>🔴 红色点: 手部关键点 (21个)</p>
      </div>
    </div>
  );
};
