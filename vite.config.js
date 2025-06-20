import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: './',
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // 필요한 페이지들을 수동으로 추가
        'company': resolve(__dirname, 'html/page/company.html'),
        'service-01-analysis': resolve(__dirname, 'html/page/service-01-analysis.html'),
        'solution-01-dfas-pro': resolve(__dirname, 'html/page/solution-01-dfas-pro.html'),
        // ... 다른 페이지들도 여기에 추가 ...
      },
    },
  },
}); 