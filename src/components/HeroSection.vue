<script setup>
import IconTelegram from './IconTelegram.vue'
import { bloggers } from '@/data/bloggers'
import { TELEGRAM_URL } from '@/data/site'

// Віяло з трьох карток: ліва, центральна (попереду), права
const byId = Object.fromEntries(bloggers.map((b) => [b.id, b]))
const fan = [
  { blogger: byId.max, x: '-46%', y: '5%', r: '-8deg', z: 1 },
  { blogger: byId.sophia, x: '0%', y: '-3%', r: '0deg', z: 2 },
  { blogger: byId.alex, x: '46%', y: '5%', r: '8deg', z: 1 },
]
</script>

<template>
  <section id="top" aria-labelledby="hero-title" class="relative overflow-hidden">
    <div
      class="mx-auto grid max-w-6xl gap-12 px-4 pt-10 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8 lg:px-8 lg:pt-16 lg:pb-12"
    >
      <div>
        <h1
          id="hero-title"
          class="font-display text-[clamp(2.25rem,8vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance"
        >
          Цифрові <span class="whitespace-nowrap">AI-блогери</span> для вашого бренду
        </h1>
        <p class="mt-6 max-w-[40ch] text-lg leading-relaxed text-steel">
          Персонажі з готовим стилем, голосом і аудиторією. Вони ведуть рекламу вашого бренду щодня, без зірваних
          дедлайнів і ризику скандалів.
        </p>
        <a :href="TELEGRAM_URL" class="btn-tg mt-8 w-full text-base sm:w-auto" target="_blank" rel="noopener">
          <IconTelegram class="size-5" />
          Перейти в Telegram
        </a>
      </div>

      <!-- Віяло дублює каталог нижче, тому для скрінрідерів воно приховане -->
      <div
        aria-hidden="true"
        class="relative mx-auto h-[20rem] w-full max-w-sm sm:h-[30rem] sm:max-w-lg lg:h-[36rem] lg:max-w-none lg:[--spread:1.2]"
      >
        <!-- М'яке перламутрове світло за віялом, як контровий світло на фото -->
        <div
          aria-hidden="true"
          class="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,var(--color-foil-lilac),var(--color-foil-mint)_55%,transparent)] opacity-70 blur-3xl"
        ></div>

        <figure
          v-for="card in fan"
          :key="card.blogger.id"
          class="holo-card chrome-frame absolute top-1/2 left-1/2 w-[48%] rounded-3xl p-1.5 shadow-[0_24px_48px_-24px_rgb(28_31_38/0.35)] lg:w-[54%]"
          :style="{
            zIndex: card.z,
            transform: `translate(-50%, -50%) translate(calc(${card.x} * var(--spread, 1)), ${card.y}) rotate(${card.r})`,
          }"
        >
          <div class="holo-media rounded-[1.125rem] bg-pearl-deep">
            <img
              :src="card.blogger.image"
              :srcset="`${card.blogger.imageSm} 600w, ${card.blogger.image} 896w`"
              sizes="(min-width: 1024px) 280px, 58vw"
              width="896"
              height="1152"
              alt=""
              :fetchpriority="card.z === 2 ? 'high' : 'auto'"
              class="aspect-[4/5] w-full object-cover object-[50%_20%]"
            />
          </div>
          <!-- Бічні картки частково сховані за центральною, тож підпис лишаємо тільки на ній -->
          <figcaption
            class="px-2.5 pt-2.5 pb-1.5 text-sm font-medium text-graphite"
            :class="{ invisible: card.z !== 2 }"
          >
            {{ card.blogger.handle }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
