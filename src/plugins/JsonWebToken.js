import Jwt from 'jsonwebtoken'

export default{
    install(Vue, ){
        Vue.prototype.$jwt = Jwt
    }
}