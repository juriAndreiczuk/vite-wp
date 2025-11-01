export const changeActive = (elts: string, n: number) => {
  let currentElements = document.querySelectorAll<HTMLElement>(`.${elts}`)
  for (let i = 0; i < currentElements.length; i++) {
    if (currentElements[i]) {
      currentElements[i].classList.remove(`${elts}--active`)
    }
  }
  if (currentElements[n]) {
    currentElements[n].classList.add(`${elts}--active`)
  }
}

export const equalHeigth = (targetItems: string) => {
  let maxHeight = 0
  const itemsNodeList = document.querySelectorAll<HTMLElement>(targetItems)

  for (let i = 0; i < itemsNodeList.length; i++) {
    itemsNodeList[i].style.height = 'auto'
    if (maxHeight < itemsNodeList[i].offsetHeight) {
      maxHeight = itemsNodeList[i].offsetHeight
    }
  }
  for (let i = 0; i < itemsNodeList.length; i++) {
    if (screen.width > 992) {
      itemsNodeList[i].style.height = `${maxHeight}px`
    } else {
      itemsNodeList[i].style.height = 'auto'
    }
  }
}

export const getCoords = (elem: HTMLElement) => {
  const box = elem.getBoundingClientRect()
  const body = document.body
  const docEl = document.documentElement
  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft
  const clientTop = docEl.clientTop || body.clientTop || 0
  const clientLeft = docEl.clientLeft || body.clientLeft || 0
  const top = box.top + scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return {
    top: top,
    left: left
  }
}

export const delay = (n = 100) =>
  new Promise((done) => setTimeout(() => done(true), n))

export const flexSize = (size: number) =>
  screen.width > 1200 ? `${(size / 1200) * 100}vw` : `${size}px`

export const addLinksBlank = (links: HTMLAnchorElement[]) => {
  if (links.length) {
    return Array.from(links).map((link) => {
      link.target = '_blank'
      return link
    })
  }
}
