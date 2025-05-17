import type { PageHooks, IPage } from './../types/core.types'

class Page implements IPage {
  namespace: string
  beforeEnterFunction: () => void
  afterEnterFunction: () => void
  beforeLeaveFunction: () => void

  constructor(namespace: string, hooks: PageHooks = {}) {
    this.namespace = namespace
    this.beforeEnterFunction = hooks.beforeEnter ?? (() => {})
    this.afterEnterFunction = hooks.afterEnter ?? (() => {})
    this.beforeLeaveFunction = hooks.beforeLeave ?? (() => {})
  }

  static firstLoading() {
    console.log('loaded...')
  }

  beforeEnter() {
    window.scrollTo({ top: 0, behavior: 'instant' })
    this.beforeEnterFunction()
  }

  afterEnter() {
    setTimeout(() => {
      gsap.timeline().to('.site-content', { opacity: 1 })
      this.afterEnterFunction()
    })
  }

  beforeLeave() {
    gsap.timeline().to('.site-content', { opacity: 0 })
    this.beforeLeaveFunction()
  }
}

export default Page
