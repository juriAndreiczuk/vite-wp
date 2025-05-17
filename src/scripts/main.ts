import './../styles/app.scss'
import './../img/right-arrow.svg'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import App from './core/App'

gsap.registerPlugin(ScrollTrigger)
window.ScrollTrigger = ScrollTrigger
window.gsap = gsap

const app = new App()

app.appStart()
