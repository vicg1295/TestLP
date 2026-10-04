<script setup>
import FacetMark from './FacetMark.vue'
import { bloggers } from '@/data/bloggers'

// Половина стрічки має бути ширша за екран, тому список повторюємо двічі
const handles = [...bloggers, ...bloggers].map((b) => b.handle)
const niches = [...bloggers, ...bloggers].map((b) => b.niche)
</script>

<template>
  <!-- Декоративні перехресні стрічки між hero і каталогом -->
  <div v-scroll-var aria-hidden="true" class="relative overflow-hidden py-14 sm:py-20">
    <div class="marquee-band marquee-band--back">
      <div class="marquee-track marquee-track--reverse py-3">
        <template v-for="half in 2" :key="half">
          <span
            v-for="(niche, i) in niches"
            :key="`${half}-${i}`"
            class="flex items-center gap-6 pr-6 font-display text-base font-semibold sm:gap-8 sm:pr-8 sm:text-xl"
          >
            {{ niche }}
            <FacetMark class="size-5 text-graphite sm:size-6" />
          </span>
        </template>
      </div>
    </div>

    <div class="marquee-band marquee-band--front">
      <div class="marquee-track py-4 sm:py-5">
        <template v-for="half in 2" :key="half">
          <span
            v-for="(handle, i) in handles"
            :key="`${half}-${i}`"
            class="flex items-center gap-6 pr-6 font-display text-xl font-semibold sm:gap-8 sm:pr-8 sm:text-3xl"
          >
            <span :class="{ 'marquee-outline': i % 2 === 1 }">{{ handle }}</span>
            <FacetMark class="size-6 text-white sm:size-8" />
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
