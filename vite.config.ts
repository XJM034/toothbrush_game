import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { resolve } from 'path'

// 检查是否为 embed 构建模式
const isEmbedBuild = process.env.BUILD_MODE === 'embed'

// https://vite.dev/config/
export default defineConfig({
  plugins: isEmbedBuild ? [basicSsl()] : [react(), basicSsl()],
  server: {
    https: {}, // basic-ssl 插件自动生成自签证书
    host: '0.0.0.0', // 允许局域网访问（移动端测试）
    port: 5173
  },
  build: isEmbedBuild
    ? {
        // Embed 库构建配置
        lib: {
          entry: resolve(__dirname, 'src/embed/index.ts'),
          name: 'BrushGame',
          formats: ['umd', 'es'],
          fileName: (format) => `brushing-engine.${format === 'umd' ? 'umd' : 'esm'}.js`
        },
        outDir: 'prototype/lib/embed',
        emptyOutDir: true, // Safe: only clears embed subfolder
        rollupOptions: {
          // 不排除任何依赖，全部打包进去
          external: [],
          output: {
            // 确保 UMD 全局变量名为 BrushGame
            globals: {}
          }
        },
        chunkSizeWarningLimit: 5000, // Embed 包较大
        minify: 'esbuild' // 使用 esbuild 压缩（更快，无需额外安装）
      }
    : {
        // 默认 SPA 构建配置
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
