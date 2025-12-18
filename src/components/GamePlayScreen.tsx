// 游戏实际游玩屏幕 - 集成头套渲染和检测
import { useEffect, useRef, useState, useCallback } from 'react';
import { useCamera } from '../hooks/useCamera';
import { useMediaPipe } from '../hooks/useMediaPipe';
import { useGameStateMachine } from '../hooks/useGameStateMachine';
import { AvatarRenderer } from '../core/rendering/AvatarRenderer';
import { DebugRenderer } from '../core/rendering/DebugRenderer';
import type { AvatarConfig, DetectionResult } from '../types';

interface GamePlayScreenProps {
  avatar: AvatarConfig;
  onExit: () => void;
  showDebug?: boolean;
}

export const GamePlayScreen: React.FC<GamePlayScreenProps> = ({
  avatar,
  onExit,
  showDebug = true
}) => {
  const { videoRef, isReady, error: cameraError, startCamera, stopCamera } = useCamera();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const avatarRendererRef = useRef(new AvatarRenderer());
  const prevHandResultRef = useRef<any>(null);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const detectionStartedRef = useRef(false);

  const [fps, setFps] = useState(0);
  const [detectionStats, setDetectionStats] = useState({
    faceDetected: false,
    handDetected: false,
    jawOpen: 0
  });
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  // 游戏状态管理
  const {
    gameState,
    gameStats,
    remainingTime,
    progress,
    updateGame,
    initGame
  } = useGameStateMachine({
    gameDurationMs: 60000,
    scorePerBrush: 10
  });

  // 加载头套图片
  useEffect(() => {
    // 如果 imgUrl 不以 http 开头且不存在，则跳过加载
    if (!avatar.imgUrl || avatar.imgUrl === '') {
      setAvatarLoaded(true);
      return;
    }

    avatarRendererRef.current
      .loadAvatar(avatar.imgUrl)
      .then(() => {
        setAvatarLoaded(true);
      })
      .catch((err) => {
        // 如果图片加载失败，仍然允许游戏继续（只是没有头套渲染）
        console.warn('[GamePlayScreen] 头套加载失败（将继续游戏）:', err);
        setAvatarLoaded(true);
      });

    return () => {
      avatarRendererRef.current.dispose();
    };
  }, [avatar.imgUrl]);

  // 检测处理回调
  const handleDetection = useCallback((result: DetectionResult) => {
    frameCountRef.current++;

    const now = performance.now();
    if (now - lastTimeRef.current >= 1000) {
      const fps = frameCountRef.current;
      frameCountRef.current = 0;
      lastTimeRef.current = now;
      setFps(fps);
    }

    const faceDetected = result.faceResult.landmarks !== null;
    const handDetected = result.handResult.landmarks !== null;
    const jawOpen = result.faceResult.blendshapes?.get('jawOpen') ?? 0;

    setDetectionStats({
      faceDetected,
      handDetected,
      jawOpen
    });

    // 更新游戏状态
    if (gameState !== 'gameover') {
      updateGame(result);
    }

    // 绘制到 Canvas
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      // 同步 canvas 大小
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // 清空画布
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制视频帧
        try {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        } catch (error) {
          console.error('[GamePlayScreen] 绘制视频失败:', error);
        }

        // 绘制头套（如果加载完成）
        if (avatarLoaded && result.faceResult.landmarks) {
          try {
            avatarRendererRef.current.render(
              ctx,
              result.faceResult,
              avatar,
              canvas.width,
              canvas.height
            );
          } catch (error) {
            console.error('[GamePlayScreen] 绘制头套失败:', error);
          }
        }

        // 绘制调试信息
        if (showDebug) {
          // 人脸中心和方向
          if (faceDetected) {
            DebugRenderer.renderFaceCenter(ctx, result.faceResult, canvas.width, canvas.height);
          }

          // 人脸信息
          DebugRenderer.renderFaceInfo(ctx, result.faceResult, 10, 10);

          // 手部中心
          if (handDetected) {
            DebugRenderer.renderHandCenter(ctx, result.handResult, canvas.width, canvas.height);
          }

          // FPS
          DebugRenderer.renderFPS(ctx, fps, 10, 150);

          // 状态指示
          DebugRenderer.renderStatus(ctx, {
            faceDetected,
            handDetected
          }, 10, 180);
        }
      }
    }

    prevHandResultRef.current = result.handResult;
  }, [avatar, avatarLoaded, videoRef, showDebug, fps, gameState, updateGame]);

  // MediaPipe 初始化
  const { isInitialized, error: mediaError, startDetection, stopDetection } = useMediaPipe({
    videoRef,
    onDetection: handleDetection
  });

  // 启动摄像头和检测
  useEffect(() => {
    const start = async () => {
      await startCamera();
    };
    start();

    return () => {
      stopCamera();
      stopDetection();
      detectionStartedRef.current = false;
    };
  }, [startCamera, stopCamera, stopDetection]);

  // 初始化游戏
  useEffect(() => {
    if (isReady && isInitialized) {
      console.log('[GamePlayScreen] 初始化游戏');
      initGame();
    }
  }, [isReady, isInitialized, initGame]);

  // 当摄像头就绪时启动检测
  useEffect(() => {
    if (isReady && isInitialized && !detectionStartedRef.current) {
      console.log('[GamePlayScreen] 启动检测循环');
      detectionStartedRef.current = true;
      startDetection();
    }
  }, [isReady, isInitialized, startDetection]);

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
      <h1 style={{ fontSize: '24px' }}>🎮 刷牙游戏 - {avatar.name}</h1>

      {/* 游戏信息 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '15px',
          width: '100%',
          maxWidth: '800px'
        }}
      >
        <div
          style={{
            backgroundColor: '#444',
            padding: '12px',
            borderRadius: '5px',
            textAlign: 'center',
            border: gameState === 'playing' ? '2px solid #0f0' : '2px solid #666'
          }}
        >
          <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#888' }}>积分</p>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{gameStats.score}</p>
        </div>
        <div
          style={{
            backgroundColor: '#444',
            padding: '12px',
            borderRadius: '5px',
            textAlign: 'center',
            border: gameState === 'playing' ? '2px solid #0f0' : '2px solid #666'
          }}
        >
          <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#888' }}>成功次数</p>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{gameStats.successCount}</p>
        </div>
        <div
          style={{
            backgroundColor: '#444',
            padding: '12px',
            borderRadius: '5px',
            textAlign: 'center',
            border: gameState === 'playing' ? '2px solid #0f0' : '2px solid #666'
          }}
        >
          <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#888' }}>剩余时间</p>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
            {(remainingTime / 1000).toFixed(1)}s
          </p>
        </div>
        <div
          style={{
            backgroundColor: '#444',
            padding: '12px',
            borderRadius: '5px',
            textAlign: 'center',
            border: gameState === 'playing' ? '2px solid #0f0' : '2px solid #666'
          }}
        >
          <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#888' }}>准确率</p>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
            {(gameStats.accuracy * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* 进度条 */}
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>游戏进度</div>
        <div
          style={{
            width: '100%',
            height: '20px',
            backgroundColor: '#333',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '2px solid #0f0'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#0f0',
              transition: 'width 0.1s linear'
            }}
          />
        </div>
      </div>

      {/* 游戏状态显示 */}
      <div
        style={{
          padding: '10px 20px',
          backgroundColor: gameState === 'playing' ? '#004400' : '#444',
          borderRadius: '5px',
          border: gameState === 'playing' ? '2px solid #0f0' : '2px solid #666'
        }}
      >
        <p style={{ margin: 0, fontSize: '14px' }}>
          状态: <strong>{gameState}</strong>
        </p>
      </div>

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
        <p>头套: {avatarLoaded ? '✓ 已加载' : '⏳ 加载中...'}</p>
        <p>FPS: {fps}</p>
      </div>

      {/* Canvas */}
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

      {/* 控制按钮 */}
      <button
        onClick={onExit}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#ff4444',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        退出游戏
      </button>

      {/* 信息文本 */}
      <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
        <p>🎯 对着摄像头，当检测到露出牙齿 + 手部刷牙动作时获得积分</p>
      </div>
    </div>
  );
};
