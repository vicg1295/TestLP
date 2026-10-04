<script setup>
import FacetMark from './FacetMark.vue'
import { BRAND_NAME } from '@/data/site'
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <FacetMark class="size-8 shrink-0 text-graphite" />
    <span class="chrome-text font-display text-xl font-semibold tracking-[-0.01em]">{{ BRAND_NAME }}</span>
  </span>
</template>
