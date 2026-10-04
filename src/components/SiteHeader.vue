<script setup>
import BrandLogo from './BrandLogo.vue'
import IconTelegram from './IconTelegram.vue'
import { TELEGRAM_URL } from '@/data/site'
</script>

<template>
  <header class="site-header sticky top-0 z-30 border-b border-chrome/60 bg-pearl/80 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <BrandLogo />
      <a :href="TELEGRAM_URL" class="btn-tg px-4 py-2.5 text-sm" target="_blank" rel="noopener">
        <IconTelegram class="size-4.5" />
        Telegram
      </a>
    </div>
    <!-- Перламутрова лінія прогресу прокрутки -->
    <div aria-hidden="true" class="scroll-progress"></div>
  </header>
</template>
