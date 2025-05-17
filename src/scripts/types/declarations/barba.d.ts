declare module '@barba/core' {
  interface TransitionData {
    current?: {
      container: HTMLElement
      namespace: string
    }
    next: {
      container: HTMLElement
      namespace: string
    }
    trigger?: string
  }

  type TransitionHook = (data: TransitionData) => void | Promise<void>

  interface Transition {
    name?: string
    leave?: TransitionHook
    enter?: TransitionHook
    once?: TransitionHook
  }

  interface View {
    namespace: string
    beforeEnter?: () => void
    afterEnter?: () => void
    beforeLeave?: () => void
  }

  interface Barba {
    init: (config: {
      transitions?: Transition[]
      views?: View[]
      debug?: boolean
      sync?: boolean
    }) => void
  }

  const barba: Barba
  export default barba
}
