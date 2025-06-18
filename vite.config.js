import { defineConfig } from 'vite'

export default defineConfig({
  base: './',               // 상대 경로로 설정 (GCP에 적합)
  build: {
    outDir: 'dist',      // 빌드 결과 위치
    emptyOutDir: true,      // 기존 dist 삭제 후 빌드
  },
})
