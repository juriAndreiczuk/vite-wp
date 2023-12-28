class Footer {
  constructor(val) {
    this.mainWrap = document.querySelector(val)
  }

  hideAnimation() {
    gsap.timeline()
      .to(this.mainWrap, { opacity: 0 })
  }

  showAnimation() {
    gsap.timeline()
      .to(this.mainWrap, { opacity: 1 })
  }
}

export default Footer
