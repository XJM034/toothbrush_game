// 游戏屏幕 - 主游戏流程
import { useState } from 'react';
import type { AvatarConfig } from '../types';
import { AvatarSelector } from './AvatarSelector';
import { GamePlayScreen } from './GamePlayScreen';

type GameState = 'avatar_select' | 'playing';

export const GameScreen: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('avatar_select');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarConfig | null>(null);

  const handleAvatarSelect = (avatar: AvatarConfig) => {
    console.log('[GameScreen] 选择头套:', avatar.id);
    setSelectedAvatar(avatar);
    setGameState('playing');
  };

  const handleGameExit = () => {
    console.log('[GameScreen] 退出游戏');
    setGameState('avatar_select');
    setSelectedAvatar(null);
  };

  return (
    <>
      {gameState === 'avatar_select' && (
        <AvatarSelector onSelect={handleAvatarSelect} />
      )}

      {gameState === 'playing' && selectedAvatar && (
        <GamePlayScreen
          avatar={selectedAvatar}
          onExit={handleGameExit}
        />
      )}
    </>
  );
};
