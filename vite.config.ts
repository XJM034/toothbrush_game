import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    https: true, // 开启 HTTPS（摄像头权限需要）
    host: '0.0.0.0', // 允许局域网访问（移动端测试）
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'mediapipe': ['@mediapipe/tasks-vision'], // MediaPipe 独立打包
          'react': ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 2000 // MediaPipe 较大，提高阈值
  }
})
