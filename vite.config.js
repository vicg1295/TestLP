import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Кириличні й латинські файли шрифтів потрібні для першого екрана, тож у продакшн-збірці
// підвантажуємо їх паралельно з JS. Інші підмножини (-ext, vietnamese) лишаються лінивими.
const CRITICAL_FONT = /(unbounded|onest)-(cyrillic|latin)-wght-normal-[\w-]+\.woff2$/

function preloadCriticalFonts() {
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, { bundle }) {
        return Object.keys(bundle ?? {})
          .filter((file) => CRITICAL_FONT.test(file))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head',
          }))
      },
    },
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), preloadCriticalFonts()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
