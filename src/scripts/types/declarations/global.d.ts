import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

declare global {
  interface Window {
    ScrollTrigger: typeof ScrollTrigger
    gsap: typeof gsap
  }
}
