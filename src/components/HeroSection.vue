<script setup>
import { ref } from 'vue'
import IconTelegram from './IconTelegram.vue'
import { bloggers } from '@/data/bloggers'
import { TELEGRAM_URL } from '@/data/site'

const title = 'Цифрові AI-блогери для вашого бренду'
const words = title.split(' ')
// Коли останнє слово доїхало, заголовок перемикається на перламутровий перелив
const titleReady = ref(false)

// Віяло з трьох карток: depth — наскільки сильно картка реагує на курсор і прокрутку
const byId = Object.fromEntries(bloggers.map((b) => [b.id, b]))
const fan = [
  { blogger: byId.max, x: '-46%', y: '5%', r: '-8deg', z: 1, depth: 1, delay: '0.55s', phase: '-2s' },
  { blogger: byId.sophia, x: '0%', y: '-3%', r: '0deg', z: 2, depth: 1.6, delay: '0.4s', phase: '0s' },
  { blogger: byId.alex, x: '46%', y: '5%', r: '8deg', z: 1, depth: 1.25, delay: '0.55s', phase: '-4s' },
]
</script>

<template>
  <section id="top" v-pointer-vars v-scroll-var.exit aria-labelledby="hero-title" class="relative isolate overflow-hidden">
    <div aria-hidden="true" class="aurora">
      <span class="aurora-blob aurora-blob--mint"></span>
      <span class="aurora-blob aurora-blob--lilac"></span>
      <span class="aurora-blob aurora-blob--pink"></span>
    </div>

    <div
      class="mx-auto grid max-w-6xl gap-12 px-4 pt-10 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8 lg:px-8 lg:pt-16 lg:pb-12"
    >
      <div>
        <h1
          id="hero-title"
          :aria-label="title"
          class="hero-title font-display text-[clamp(2.25rem,8vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance"
          :class="{ 'is-ready': titleReady }"
        >
          <template v-for="(word, i) in words" :key="word">
            <span class="word-mask" aria-hidden="true"
              ><span
                class="word"
                :style="{ '--i': i }"
                @animationend="i === words.length - 1 && (titleReady = true)"
                >{{ word }}</span
              ></span
            >{{ ' ' }}
          </template>
        </h1>
        <p v-reveal="450" class="mt-6 max-w-[40ch] text-lg leading-relaxed text-steel">
          Персонажі з готовим стилем, голосом і аудиторією. Вони ведуть рекламу вашого бренду щодня, без зірваних
          дедлайнів і ризику скандалів.
        </p>
        <div v-reveal="600" class="mt-8">
          <a :href="TELEGRAM_URL" class="btn-tg btn-shine w-full text-base sm:w-auto" target="_blank" rel="noopener">
            <IconTelegram class="size-5" />
            Перейти в Telegram
          </a>
        </div>
      </div>

      <!-- Віяло дублює каталог нижче, тому для скрінрідерів воно приховане -->
      <div
        aria-hidden="true"
        class="fan relative mx-auto h-[20rem] w-full max-w-sm sm:h-[30rem] sm:max-w-lg lg:h-[36rem] lg:max-w-none lg:[--spread:1.2]"
      >
        <div
          v-for="card in fan"
          :key="card.blogger.id"
          class="fan-slot absolute top-1/2 left-1/2 w-[48%] lg:w-[54%]"
          :style="{
            zIndex: card.z,
            '--x': card.x,
            '--y': card.y,
            '--r': card.r,
            '--depth': card.depth,
            '--delay': card.delay,
          }"
        >
          <figure
            class="fan-float holo-auto chrome-frame rounded-3xl p-1.5 shadow-[0_24px_48px_-24px_rgb(28_31_38/0.35)]"
            :style="{ '--foil-delay': card.phase, '--float-delay': card.phase }"
          >
            <div class="holo-media rounded-[1.125rem] bg-pearl-deep">
              <img
                :src="card.blogger.image"
                :srcset="`${card.blogger.imageSm} 600w, ${card.blogger.image} 896w`"
                sizes="(min-width: 1024px) 300px, 50vw"
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
    </div>
  </section>
</template>
