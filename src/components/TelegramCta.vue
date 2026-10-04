<script setup>
import IconTelegram from './IconTelegram.vue'
import { TELEGRAM_URL } from '@/data/site'
</script>

<template>
  <section aria-labelledby="cta-title" class="pb-16 sm:pb-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div
        v-reveal
        v-pointer-vars
        class="relative overflow-hidden rounded-[2rem] bg-graphite px-6 py-12 text-white sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between lg:gap-12"
      >
        <!-- Перламутрове сяйво в куті панелі повільно обертається -->
        <div
          aria-hidden="true"
          class="cta-glow absolute -top-28 -right-20 size-80 rounded-full bg-[conic-gradient(from_200deg,var(--color-foil-mint),var(--color-iris),var(--color-foil-pink),var(--color-tg),var(--color-foil-mint))] opacity-45 blur-[72px]"
        ></div>
        <!-- М'яке світло, що йде за курсором -->
        <div aria-hidden="true" class="cta-spotlight pointer-events-none absolute inset-0"></div>

        <div class="relative max-w-xl">
          <h2
            id="cta-title"
            class="font-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance sm:text-3xl"
          >
            Підберемо блогера під ваш бренд
          </h2>
          <p class="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Напишіть нам у Telegram: обговоримо задачу, формат і запуск першої кампанії.
          </p>
        </div>

        <a
          :href="TELEGRAM_URL"
          class="btn-tg btn-shine relative mt-8 w-full text-base sm:w-auto lg:mt-0 lg:shrink-0"
          target="_blank"
          rel="noopener"
        >
          <IconTelegram class="size-5" />
          Перейти в Telegram
        </a>
      </div>
    </div>
  </section>
</template>
