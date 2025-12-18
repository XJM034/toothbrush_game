// 头套选择器 - 让用户选择卡通头套
import { avatarConfigs } from '../config/avatar.config';
import type { AvatarConfig } from '../types';

interface AvatarSelectorProps {
  onSelect: (avatar: AvatarConfig) => void;
  disabled?: boolean;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  onSelect,
  disabled = false
}) => {
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
        gap: '40px'
      }}
    >
      <h1 style={{ fontSize: '32px', textAlign: 'center' }}>
        🎮 刷牙游戏 - 选择你的头套
      </h1>

      <p style={{ fontSize: '16px', color: '#999', textAlign: 'center' }}>
        点击下面的头套开始游戏
      </p>

      {/* 头套网格 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          maxWidth: '800px',
          width: '100%'
        }}
      >
        {avatarConfigs.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => !disabled && onSelect(avatar)}
            disabled={disabled}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              padding: '20px',
              backgroundColor: '#333',
              border: '3px solid #0f0',
              borderRadius: '10px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              transition: 'all 0.3s ease',
              fontSize: '16px',
              color: '#fff'
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#444';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#0ff';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#333';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#0f0';
            }}
          >
            {/* 头套预览图（如果存在） */}
            {avatar.imgUrl && (
              <img
                src={avatar.imgUrl}
                alt={avatar.name}
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'contain',
                  borderRadius: '5px',
                  backgroundColor: '#222'
                }}
                onError={(e) => {
                  // 图片加载失败时显示占位符
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            )}

            {/* 头套名称 */}
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
              {avatar.name}
            </span>

            {/* 选择按钮文本 */}
            <span style={{ fontSize: '12px', color: '#aaa' }}>
              点击选择
            </span>
          </button>
        ))}
      </div>

      {/* 提示信息 */}
      <div
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#666',
          marginTop: '40px'
        }}
      >
        <p>💡 选择你最喜欢的头套，然后开始刷牙游戏！</p>
        <p>📱 需要摄像头权限</p>
      </div>
    </div>
  );
};
