import { createApp } from 'vue'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/onest'
import './style.css'
import App from './App.vue'
import { initPageScroll, vPointerVars, vReveal, vScrollVar } from './motion/directives'

createApp(App)
  .directive('reveal', vReveal)
  .directive('scroll-var', vScrollVar)
  .directive('pointer-vars', vPointerVars)
  .mount('#app')

initPageScroll()
