import { AvatarConfig } from '../types';

// 头套配置列表
// faceHoleOffset: 脸洞相对于图片中心的偏移（归一化值 -0.5 到 0.5）
//   - x: 正值 = 脸洞在图片中心右侧，负值 = 左侧
//   - y: 正值 = 脸洞在图片中心下方，负值 = 上方
// anchorOffset: 额外的位置微调（归一化值）
// scale: 头套整体缩放系数（默认 1.0）

export const avatarConfigs: AvatarConfig[] = [
  {
    id: 'cat',
    name: '🐱 猫咪',
    imgUrl: '/img/cat.png',
    faceHoleOffset: { x: 0, y: 0.25 },  // 脸洞在图片下方
    anchorOffset: { x: 0, y: -0.15 },   // 整体向上移动
    scale: 1.0
  },
  {
    id: 'dog',
    name: '🐶 小狗',
    imgUrl: '/img/dog.png',
    faceHoleOffset: { x: 0, y: 0.25 },  // 脸洞在图片下方
    anchorOffset: { x: 0, y: -0.15 },   // 整体向上移动
    scale: 1.0
  },
  {
    id: 'rabbit',
    name: '🐰 兔子',
    imgUrl: '/img/rabbit.png',
    faceHoleOffset: { x: 0, y: 0.25 },  // 脸洞在图片下方
    anchorOffset: { x: 0, y: -0.15 },   // 整体向上移动
    scale: 1.0
  }
];

// 默认头套
export const defaultAvatar = avatarConfigs[0];
