import barba from '@barba/core'
import appState from './AppState'
import { emitter } from './Emitter'
import { delay } from './utils'
import Page from './../core/Page'

class App {
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
            Page.firstLoading()
            emitter.emit('changePage', data.next.namespace)
          }
        }
      ],
      views: appState.pages
    })
  }
}

export default App
