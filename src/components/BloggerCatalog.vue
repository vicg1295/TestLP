<script setup>
import BloggerCard from './BloggerCard.vue'
import { bloggers } from '@/data/bloggers'
</script>

<template>
  <section id="catalog" aria-labelledby="catalog-title" class="py-16 sm:py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 id="catalog-title" class="font-display text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
        Знайомтеся з блогерами
      </h2>
      <p class="mt-4 max-w-[52ch] text-base leading-relaxed text-steel sm:text-lg">
        У кожного персонажа своя ніша, манера й візуальний стиль. Оберіть того, хто говорить мовою вашої аудиторії.
      </p>

      <ul role="list" class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="blogger in bloggers" :key="blogger.id" class="flex">
          <BloggerCard :blogger="blogger" class="w-full" />
        </li>
      </ul>
    </div>
  </section>
</template>
