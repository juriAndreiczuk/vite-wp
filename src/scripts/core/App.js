import barba from '@barba/core'
import appState from './AppState'
import { prototypePage } from './Page'
import { emitter } from './Emitter'
import { delay } from './utils'

export default class App {
  constructor() {
    this.appStart()
  }

  async appStart() {
    barba.init({
      sync: true,
      debug: true,
      transitions: [
        {
          async leave(data) {
            await delay(300)
            emitter.emit('changePage', data.next.namespace)
          },
          async once(data) {
            await delay(300)
            emitter.emit('changePage', data.next.namespace)
            prototypePage.firstLoading()
          }
        }
      ],
      views: appState.pages
    })
  }
}
