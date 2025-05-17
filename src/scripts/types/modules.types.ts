interface IModule { mainWrap: HTMLElement | null }

export interface IHeader extends IModule {
  navLinks: NodeListOf<HTMLAnchorElement> | undefined
  toggleMod: (val: string) => void
  searchCurrentPageLink: () => void
}

export interface IFooter extends IModule {
  hideAnimation: () => void
  showAnimation: () => void
}