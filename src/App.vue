<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import BloggerCatalog from './components/BloggerCatalog.vue'
import TelegramCta from './components/TelegramCta.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <BloggerCatalog />
    <TelegramCta />
  </main>
  <SiteFooter />
</template>
