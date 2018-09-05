


import http from '@/service/http'


export default {
    login: (account, password) => http.api('user/login', { account, password }),
    getIdentity: () => http.api('user/identity'),
    authAccesses: (auths) => http.api('user/accessesAuth', { auths })
}