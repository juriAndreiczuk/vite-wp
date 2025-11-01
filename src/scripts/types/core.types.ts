import { IFooter, IHeader } from './modules.types'

export type PageHooks = {
  beforeEnter?: () => void
  afterEnter?: () => void
  beforeLeave?: () => void
}

export interface IPage extends PageHooks {
  namespace: string
}

export interface IAppState {
  currentPage: string
  header: IHeader
  footer: IFooter
  pages: unknown[]
}
