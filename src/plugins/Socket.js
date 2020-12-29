import SocketClient from 'socket.io-client'

export default{
    install(Vue, ){
        Vue.prototype.$socketClient = SocketClient
    }
}