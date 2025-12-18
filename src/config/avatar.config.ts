import { AvatarConfig } from '../types';

// 头套配置列表
export const avatarConfigs: AvatarConfig[] = [
  {
    id: 'cat',
    name: '🐱 猫咪',
    imgUrl: '/img/cat.png',
    anchorOffset: { x: 0, y: -0.1 }  // 向上偏移 10%
  },
  {
    id: 'dog',
    name: '🐶 小狗',
    imgUrl: '/img/dog.png',
    anchorOffset: { x: 0, y: -0.05 }
  },
  {
    id: 'rabbit',
    name: '🐰 兔子',
    imgUrl: '/img/Rabbit.png',
    anchorOffset: { x: 0, y: -0.15 }
  }
];

// 默认头套
export const defaultAvatar = avatarConfigs[0];
