import { resolve } from "path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(({ command, mode }) => {
  const isDev = mode === "development";
  return {
    base: isDev ? "./" : "/urock.kr/",
    publicDir: "public",
    plugins: [
      createHtmlPlugin({
        minify: true,
      }),
    ],
    build: {
      outDir: "dist",
      assetsDir: "assets",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          intro: resolve(__dirname, "html/section/intro.html"),
          //component
          buttons: resolve(__dirname, "html/component/buttons.html"),
          cards: resolve(__dirname, "html/component/cards.html"),
          inputs: resolve(__dirname, "html/component/inputs.html"),
          tab: resolve(__dirname, "html/component/tab.html"),
          title: resolve(__dirname, "html/component/title.html"),
          //detail > detail-support-news
          "detail-01-news": resolve(
            __dirname,
            "html/detail/detail-support-news/detail-01-news.html"
          ),
          "detail-02-business": resolve(
            __dirname,
            "html/detail/detail-support-news/detail-02-business.html"
          ),
          "detail-03-education": resolve(
            __dirname,
            "html/detail/detail-support-news/detail-03-education.html"
          ),
          "detail-04-exhibition": resolve(
            __dirname,
            "html/detail/detail-support-news/detail-04-exhibition.html"
          ),
          "detail-05-notice": resolve(
            __dirname,
            "html/detail/detail-support-news/detail-05-notice.html"
          ),
          //detail
          "detail-service-01-analysis": resolve(
            __dirname,
            "html/detail/detail-service-01-analysis.html"
          ),
          "detail-service-02-authentication": resolve(
            __dirname,
            "html/detail/detail-service-02-authentication.html"
          ),
          "detail-service-03-education": resolve(
            __dirname,
            "html/detail/detail-service-03-education.html"
          ),
          "detail-solution-01-dfas-pro": resolve(
            __dirname,
            "html/detail/detail-solution-01-dfas-pro.html"
          ),
          "detail-solution-02-dfas-ent": resolve(
            __dirname,
            "html/detail/detail-solution-02-dfas-ent.html"
          ),
          "detail-solution-03-mcq-p": resolve(
            __dirname,
            "html/detail/detail-solution-03-mcq-p.html"
          ),
          "detail-solution-04-mcq-s": resolve(
            __dirname,
            "html/detail/detail-solution-04-mcq-s.html"
          ),
          "detail-solution-05-mcq-g": resolve(
            __dirname,
            "html/detail/detail-solution-05-mcq-g.html"
          ),
          "detail-solution-06-gm": resolve(
            __dirname,
            "html/detail/detail-solution-06-gm.html"
          ),
          "detail-solution-07-gm-pro": resolve(
            __dirname,
            "html/detail/detail-solution-07-gm-pro.html"
          ),
          "detail-support-01-inquiry": resolve(
            __dirname,
            "html/detail/detail-support-01-inquiry.html"
          ),
          "detail-support-02-news": resolve(
            __dirname,
            "html/detail/detail-support-02-news.html"
          ),
          //page
          company: resolve(__dirname, "html/page/company.html"),
          "service-01-analysis": resolve(
            __dirname,
            "html/page/service-01-analysis.html"
          ),
          "service-02-authentication": resolve(
            __dirname,
            "html/page/service-02-authentication.html"
          ),
          "service-03-education": resolve(
            __dirname,
            "html/page/service-03-education.html"
          ),
          "solution-01-dfas-pro": resolve(
            __dirname,
            "html/page/solution-01-dfas-pro.html"
          ),
          "solution-02-dfas-ent": resolve(
            __dirname,
            "html/page/solution-02-dfas-ent.html"
          ),
          "solution-03-mcq-p": resolve(
            __dirname,
            "html/page/solution-03-mcq-p.html"
          ),
          "solution-04-mcq-s": resolve(
            __dirname,
            "html/page/solution-04-mcq-s.html"
          ),
          "solution-05-mcq-g": resolve(
            __dirname,
            "html/page/solution-05-mcq-g.html"
          ),
          "solution-06-gm": resolve(__dirname, "html/page/solution-06-gm.html"),
          "solution-07-gm-pro": resolve(
            __dirname,
            "html/page/solution-07-gm-pro.html"
          ),
          "support-01-inquiry": resolve(
            __dirname,
            "html/page/support-01-inquiry.html"
          ),
          "support-02-news": resolve(
            __dirname,
            "html/page/support-02-news.html"
          ),
          //section
          description: resolve(__dirname, "html/section/description.html"),
          footer: resolve(__dirname, "html/section/footer.html"),
          header: resolve(__dirname, "html/section/header.html"),
        },
        output: {
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `images/[name][extname]`;
            }
            if (/mp4|webm|ogg|mov/i.test(ext)) {
              return `video/[name][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `fonts/[name][extname]`;
            }
            if (ext === "css") {
              return `css/[name][extname]`;
            }
            return `assets/[name][extname]`;
          },
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      cors: true,
    },
    preview: {
      port: 4173,
      open: true,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./"),
        "@public": resolve(__dirname, "./public"),
        "@css": resolve(__dirname, "./css"),
        "@js": resolve(__dirname, "./js"),
        "@html": resolve(__dirname, "./html"),
      },
    },
  };
});

// import { resolve } from 'path';
// import { defineConfig } from 'vite';
// import { createHtmlPlugin } from 'vite-plugin-html';

// export default defineConfig({
//   base: './',
//   publicDir: 'public',
//   plugins: [
//     createHtmlPlugin({
//       minify: true,
//     }),
//   ],
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//     rollupOptions: {

//       output: {
//         assetFileNames: (assetInfo) => {
//           const info = assetInfo.name.split('.');
//           const ext = info[info.length - 1];

//           if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
//             return `images/[name][extname]`;
//           }

//           if (/mp4|webm|ogg|mov/i.test(ext)) {
//             return `video/[name][extname]`;
//           }

//           if (/woff2?|eot|ttf|otf/i.test(ext)) {
//             return `fonts/[name][extname]`;
//           }

//           if (ext === 'css') {
//             return `css/[name][extname]`;
//           }

//           return `assets/[name][extname]`;
//         },

//         chunkFileNames: 'js/[name]-[hash].js',
//         entryFileNames: 'js/[name]-[hash].js'
//       }
//     },
//   },

//   server: {
//     port: 3000,
//     open: true,
//     cors: true
//   },

//   preview: {
//     port: 4173,
//     open: true
//   },

//   resolve: {
//     alias: {
//       '@': resolve(__dirname, './'),
//       '@public': resolve(__dirname, './public'),
//       '@css': resolve(__dirname, './css'),
//       '@js': resolve(__dirname, './js'),
//       '@html': resolve(__dirname, './html')
//     }
//   }
// });
