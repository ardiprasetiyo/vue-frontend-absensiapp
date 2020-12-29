import Moment from 'moment'

export default {
  install(Vue, ) {
    Object.defineProperty(Vue.prototype, '$moment', {
      'value': Moment
    })
  }
}
