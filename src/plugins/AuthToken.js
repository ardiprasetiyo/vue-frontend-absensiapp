import Axios from 'axios/dist/axios'

export const AuthToken = {
    verifyToken(accessToken) {
        
        return new Promise( (resolve, reject) => {
            Axios({
                method: 'post',
                url: process.env.VUE_APP_API_HOST + '/api/v1/auth/token/',
                headers: {
                    'Access-Token': accessToken
                }
            }).then((response) => {
                resolve(response)
            }).catch((Exception) => {
                reject(Exception)
            })
        })

    },

    generateToken(accessToken, refreshToken){ 
        return new Promise((resolve, reject) => {
        Axios({
            method: 'get',
            url: process.env.VUE_APP_API_HOST + '/api/v1/auth/token/',
            headers:{
                'Access-Token': accessToken,
                'Refresh-Token': refreshToken
            }
        }).then((response) => {
            resolve(response)
        }).catch((Exception) => {
            reject(Exception)
        })
        })
    }
}

export default {
    install(Vue,) {
        Vue.prototype.$authtoken = AuthToken
    }
}
