// 诊断屏幕 - 排查黑屏问题
import { useEffect, useRef, useState } from 'react';

export const DiagnosticsScreen: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const addStatus = (msg: string) => {
    console.log(msg);
    setStatus(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  useEffect(() => {
    const startTest = async () => {
      addStatus('开始诊断...');

      try {
        // 1. 检查浏览器 API
        if (!navigator.mediaDevices) {
          addStatus('❌ 浏览器不支持 mediaDevices');
          return;
        }
        addStatus('✓ mediaDevices 可用');

        // 2. 请求摄像头
        addStatus('请求摄像头权限...');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false
        });
        addStatus('✓ 获得摄像头流');

        // 3. 绑定到 video 元素
        if (!videoRef.current) {
          addStatus('❌ video 元素未找到');
          return;
        }

        videoRef.current.srcObject = stream;
        addStatus('✓ 流已绑定到 video 元素');

        // 4. 等待 loadedmetadata
        await new Promise<void>((resolve) => {
          const handler = () => {
            addStatus(`✓ loadedmetadata 事件触发, 大小: ${videoRef.current?.videoWidth}x${videoRef.current?.videoHeight}`);
            videoRef.current!.removeEventListener('loadedmetadata', handler);
            resolve();
          };
          videoRef.current!.addEventListener('loadedmetadata', handler);
        });

        // 5. 播放
        addStatus('尝试播放...');
        await videoRef.current.play();
        addStatus('✓ 视频播放成功');
        setIsPlaying(true);

        // 6. 测试 canvas 绘制
        addStatus('测试 Canvas 绘制...');
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) {
          addStatus('❌ 无法获取 canvas context');
          return;
        }

        // 设置 canvas 大小
        canvasRef.current!.width = videoRef.current.videoWidth;
        canvasRef.current!.height = videoRef.current.videoHeight;
        addStatus(`✓ Canvas 大小设置为 ${canvasRef.current!.width}x${canvasRef.current!.height}`);

        // 尝试绘制
        setTimeout(() => {
          try {
            ctx.drawImage(videoRef.current!, 0, 0);
            addStatus('✓ Canvas drawImage 成功！视频应该能看到');
          } catch (error) {
            addStatus(`❌ drawImage 失败: ${error}`);
          }
        }, 1000);
      } catch (error) {
        addStatus(`❌ 错误: ${error}`);
      }
    };

    startTest();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        fontFamily: 'monospace',
        minHeight: '100vh'
      }}
    >
      <h1>🔧 诊断屏幕</h1>

      {/* 状态日志 */}
      <div
        style={{
          backgroundColor: '#222',
          padding: '15px',
          borderRadius: '5px',
          maxHeight: '300px',
          overflowY: 'auto',
          fontSize: '12px'
        }}
      >
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>诊断日志：</div>
        {status.map((msg, idx) => (
          <div key={idx} style={{ color: msg.includes('✓') ? '#0f0' : msg.includes('❌') ? '#f00' : '#fff' }}>
            {msg}
          </div>
        ))}
      </div>

      {/* 摄像头状态 */}
      <div
        style={{
          backgroundColor: '#333',
          padding: '15px',
          borderRadius: '5px'
        }}
      >
        <p>摄像头状态: {isPlaying ? '✓ 播放中' : '✗ 未播放'}</p>
      </div>

      {/* Video 元素（隐藏但可访问） */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0
        }}
      />

      {/* Canvas */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
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

      <div style={{ fontSize: '12px', color: '#999' }}>
        <p>如果看到摄像头画面在 canvas 上，说明视频流正常</p>
        <p>如果仍然黑屏，查看上面的诊断日志找出具体问题</p>
      </div>
    </div>
  );
};
