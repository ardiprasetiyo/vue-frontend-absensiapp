import Axios from 'axios'

export default {
  install(Vue, ) {
    Object.defineProperty(Vue.prototype, '$axios', {
      'value': Axios
    })
  }
}
