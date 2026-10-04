<script setup>
defineProps({
  blogger: { type: Object, required: true },
})
</script>

<template>
  <article v-pointer-vars v-scroll-var class="tilt-card chrome-frame flex flex-col rounded-3xl p-2">
    <div class="holo-media rounded-2xl bg-pearl-deep">
      <img
        :src="blogger.image"
        :srcset="`${blogger.imageSm} 600w, ${blogger.image} 896w`"
        sizes="(min-width: 1152px) 264px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
        width="896"
        height="1152"
        :alt="blogger.alt"
        loading="lazy"
        decoding="async"
        class="card-photo aspect-[4/5] w-full object-cover object-[50%_20%]"
      />
      <span class="holo-glare" aria-hidden="true"></span>
      <span
        class="absolute top-3 left-3 z-10 rounded-full bg-white/75 px-3 py-1 text-xs font-medium text-graphite backdrop-blur-sm"
      >
        {{ blogger.niche }}
      </span>
    </div>

    <div class="flex flex-1 flex-col px-3 pt-5 pb-3">
      <h3 class="font-display text-xl leading-tight font-semibold tracking-[-0.01em]">{{ blogger.name }}</h3>
      <p class="mt-1 text-sm font-medium text-steel">{{ blogger.handle }}</p>
      <p class="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-graphite/85">{{ blogger.description }}</p>
      <button type="button" class="btn-ghost mt-5 w-full">Дивитися блог</button>
    </div>
  </article>
</template>
