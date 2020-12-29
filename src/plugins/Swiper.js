import Swiper from 'swiper'
import 'swiper/swiper-bundle.css';

export default {
  install(Vue, ) {
    Object.defineProperty(Vue.prototype, '$swiper', {
      value: Swiper
    })
  }
}
