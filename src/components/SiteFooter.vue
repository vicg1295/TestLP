<script setup>
import BrandLogo from './BrandLogo.vue'
import { BRAND_NAME } from '@/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-chrome/60">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-steel sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <BrandLogo />
      <p>© {{ year }} {{ BRAND_NAME }}. Усі персонажі створені штучним інтелектом.</p>
    </div>
  </footer>
</template>
