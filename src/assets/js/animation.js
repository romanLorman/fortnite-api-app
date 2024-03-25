// ======================= ModToggle =========================
export const handleMod = (classElem, mod) =>
  `${classElem} ${mod && classElem + mod}`
// ============================================================

// ===================== SlideToggle ==========================
export let _slideUp = (target, duration = 500) => {
  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = duration + 'ms'
  target.style.height = target.offsetHeight + 'px'
  target.style.height = target.offsetHeight
  target.style.overflow = 'hidden'
  target.style.height = 0
  target.style.paddingTop = 0
  target.style.paddingBottom = 0
  target.style.marginTop = 0
  target.style.marginBottom = 0
  window.setTimeout(() => {
    target.style.display = 'none'
    target.style.removeProperty('height')
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')
    target.classList.remove('_slide')
  }, duration)
}
export let _slideDown = (target, duration = 500) => {
  target.style.removeProperty('display')
  let display = window.getComputedStyle(target).display
  if (display === 'none') display = 'block'

  target.style.display = display
  let height = target.offsetHeight
  target.style.overflow = 'hidden'
  target.style.height = 0
  target.style.paddingTop = 0
  target.style.paddingBottom = 0
  target.style.marginTop = 0
  target.style.marginBottom = 0
  target.style.height = target.offsetHeight
  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = duration + 'ms'
  target.style.height = height + 'px'
  target.style.removeProperty('padding-top')
  target.style.removeProperty('padding-bottom')
  target.style.removeProperty('margin-top')
  target.style.removeProperty('margin-bottom')
  window.setTimeout(() => {
    target.style.removeProperty('height')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')
    target.classList.remove('_slide')
  }, duration)
}
export let _slideToggle = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    if (window.getComputedStyle(target).display === 'none') {
      return _slideDown(target, duration)
    } else {
      return _slideUp(target, duration)
    }
  }
}
//====================================================
