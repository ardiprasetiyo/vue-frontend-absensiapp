import SweetAlert2 from 'sweetalert2'

export default {
  install(Vue, ) {
    Object.defineProperty(Vue.prototype, '$swal', {
      'value': SweetAlert2
    })
  }
}
