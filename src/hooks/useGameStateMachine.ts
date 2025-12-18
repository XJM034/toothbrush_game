// 游戏状态机 Hook
import { useEffect, useRef, useState, useCallback } from 'react';
import { GameStateMachine, GameState, GameStats } from '../core/game/GameStateMachine';
import { DetectionResult } from '../types';

export interface UseGameStateMachineOptions {
  gameDurationMs?: number;
  scorePerBrush?: number;
  enabled?: boolean;
}

export const useGameStateMachine = (options: UseGameStateMachineOptions = {}) => {
  const {
    gameDurationMs = 60000,
    scorePerBrush = 10,
    enabled = true
  } = options;

  const stateMachineRef = useRef(new GameStateMachine(gameDurationMs, scorePerBrush));
  const [gameState, setGameState] = useState<GameState>('init');
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    brushCount: 0,
    successCount: 0,
    totalBrushTime: 0,
    accuracy: 0
  });
  const [remainingTime, setRemainingTime] = useState(gameDurationMs);
  const [progress, setProgress] = useState(0);
  const [lastEvent, setLastEvent] = useState<string | null>(null);

  const stateMachine = stateMachineRef.current;

  // 初始化游戏
  const initGame = useCallback(() => {
    console.log('[useGameStateMachine] 初始化游戏');
    stateMachine.initialize();
    setGameState(stateMachine.getState());
    setGameStats(stateMachine.getStats());
    setRemainingTime(stateMachine.getRemainingTime());
    setProgress(stateMachine.getProgress());
  }, [stateMachine]);

  // 更新游戏状态
  const updateGame = useCallback(
    (detectionResult: DetectionResult) => {
      if (!enabled) return;

      stateMachine.update(detectionResult, 1000 / 30);

      // 更新状态
      const newState = stateMachine.getState();
      setGameState(newState);

      // 更新统计
      setGameStats(stateMachine.getStats());

      // 更新时间和进度
      setRemainingTime(stateMachine.getRemainingTime());
      setProgress(stateMachine.getProgress());
    },
    [stateMachine, enabled]
  );

  // 设置事件监听
  useEffect(() => {
    const handleStateChange = (event: any) => {
      setLastEvent('state_changed');
    };

    const handleBrushSuccess = (event: any) => {
      setLastEvent('brush_success');
      console.log('[useGameStateMachine] 刷牙成功:', event.data);
    };

    const handleGameOver = (event: any) => {
      setLastEvent('game_over');
      console.log('[useGameStateMachine] 游戏结束:', event.data);
    };

    const handleTeethOpen = (event: any) => {
      setLastEvent('teeth_open_detected');
    };

    const handleBrushingStarted = (event: any) => {
      setLastEvent('brushing_started');
    };

    stateMachine.addEventListener('state_changed', handleStateChange);
    stateMachine.addEventListener('brush_success', handleBrushSuccess);
    stateMachine.addEventListener('game_over', handleGameOver);
    stateMachine.addEventListener('teeth_open_detected', handleTeethOpen);
    stateMachine.addEventListener('brushing_started', handleBrushingStarted);

    return () => {
      stateMachine.removeEventListener('state_changed', handleStateChange);
      stateMachine.removeEventListener('brush_success', handleBrushSuccess);
      stateMachine.removeEventListener('game_over', handleGameOver);
      stateMachine.removeEventListener('teeth_open_detected', handleTeethOpen);
      stateMachine.removeEventListener('brushing_started', handleBrushingStarted);
    };
  }, [stateMachine]);

  // 重置游戏
  const resetGame = useCallback(() => {
    console.log('[useGameStateMachine] 重置游戏');
    initGame();
  }, [initGame]);

  return {
    gameState,
    gameStats,
    remainingTime,
    progress,
    lastEvent,
    updateGame,
    initGame,
    resetGame,
    stateMachine
  };
};
