interface IListener {
  [key: string]: Function[]
}

class Emitter {
  listeners: IListener

  constructor() {
    this.listeners = {}
  }

  emit<T>(event: keyof IListener, args: T) {
    if (this.listeners && !Array.isArray(this.listeners[event])) {
      return false
    }

    this.listeners[event].forEach(listener => {
      listener(args)
    })
  }

  subscribe<T>(event: string, fn: (val: T) => void) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
  }
}

export const emitter = new Emitter()

