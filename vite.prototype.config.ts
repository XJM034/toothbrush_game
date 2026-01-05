import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// Prototype 服务器配置
// 用于本地开发测试 prototype/*.html 页面
export default defineConfig({
  plugins: [basicSsl()],
  server: {
    https: true,
    host: '0.0.0.0',
    port: 5174,
    open: '/prototype/home.html'
  },
  // 将 public 和 prototype 都作为静态资源目录
  publicDir: 'public',
  root: '.'
})
