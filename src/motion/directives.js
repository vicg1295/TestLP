// Директиви для анімацій і ефектів. Кожна пише лише CSS-змінні й класи,
// а сам рух описано в style.css. Користувачі з prefers-reduced-motion
// отримують статичну сторінку.

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

// Один спільний обробник прокрутки на всі ефекти, оновлення не частіше за кадр
const scrollUpdates = new Set()
let scrollFrame = 0

function runScrollFrame() {
  scrollFrame = 0
  const viewportHeight = window.innerHeight
  for (const update of scrollUpdates) update(viewportHeight)
}

function requestScrollFrame() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(runScrollFrame)
}

function trackScroll(update) {
  if (scrollUpdates.size === 0) {
    window.addEventListener('scroll', requestScrollFrame, { passive: true })
    window.addEventListener('resize', requestScrollFrame)
  }
  scrollUpdates.add(update)
  requestScrollFrame()
  return () => scrollUpdates.delete(update)
}

// Прогрес прокрутки сторінки (--scroll, 0…1) і прапорець data-scrolled для шапки
export function initPageScroll() {
  const root = document.documentElement
  trackScroll(() => {
    const max = root.scrollHeight - window.innerHeight
    root.style.setProperty('--scroll', max > 0 ? (window.scrollY / max).toFixed(4) : '0')
    root.toggleAttribute('data-scrolled', window.scrollY > 8)
  })
}

// v-reveal="затримка, мс" — елемент проявляється, коли входить у вікно
export const vReveal = {
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.setProperty('--reveal-delay', `${value}ms`)
    if (reduceMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    observer.observe(el)
    el._revealObserver = observer
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}

// v-scroll-var — пише --sp: від −1 (елемент заходить знизу) через 0 (по центру) до 1 (виходить угорі).
// v-scroll-var.exit — від 0 (верх елемента біля верху вікна) до 1 (елемент повністю прокручено).
export const vScrollVar = {
  mounted(el, { modifiers }) {
    if (reduceMotion()) return
    el._untrackScroll = trackScroll((viewportHeight) => {
      const rect = el.getBoundingClientRect()
      const progress = modifiers.exit
        ? clamp(-rect.top / rect.height, 0, 1)
        : clamp(
            (viewportHeight / 2 - (rect.top + rect.height / 2)) / (viewportHeight / 2 + rect.height / 2),
            -1,
            1,
          )
      el.style.setProperty('--sp', progress.toFixed(4))
    })
  },
  unmounted(el) {
    el._untrackScroll?.()
  },
}

// v-pointer-vars — положення курсора над елементом:
// --mx/--my у відсотках, --hx/--hy від −1 до 1, --foil-pos — позиція перламутрової смуги фольги.
// Поки курсор над елементом, на ньому висить клас is-pointer. На тач-екранах вимкнено.
export const vPointerVars = {
  mounted(el) {
    if (reduceMotion() || !finePointer()) return

    let frame = 0
    let x = 0.5
    let y = 0.5

    const apply = () => {
      frame = 0
      const style = el.style
      style.setProperty('--mx', `${(x * 100).toFixed(2)}%`)
      style.setProperty('--my', `${(y * 100).toFixed(2)}%`)
      style.setProperty('--hx', (x * 2 - 1).toFixed(3))
      style.setProperty('--hy', (y * 2 - 1).toFixed(3))
      // Фольга займає 300% ширини: при (1.5 − x) × 50% центр смуги був би рівно під курсором.
      // Зсув на −25% відводить смугу вбік, як відблиск під кутом, і вона не лягає на обличчя.
      style.setProperty(
        '--foil-pos',
        `${((1.5 - x) * 50 - 25).toFixed(2)}% ${((1.5 - y) * 50 - 25).toFixed(2)}%`,
      )
    }

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      x = clamp((event.clientX - rect.left) / rect.width, 0, 1)
      y = clamp((event.clientY - rect.top) / rect.height, 0, 1)
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onEnter = () => el.classList.add('is-pointer')
    const onLeave = () => {
      cancelAnimationFrame(frame)
      frame = 0
      el.classList.remove('is-pointer')
      for (const prop of ['--hx', '--hy', '--foil-pos']) el.style.removeProperty(prop)
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el._pointerCleanup = () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  },
  unmounted(el) {
    el._pointerCleanup?.()
  },
}
