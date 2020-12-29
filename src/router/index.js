import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import RecoverPassword from '@/views/RecoverPassword.vue'
import RecoverConfirm from '@/views/RecoverConfirm.vue'
import Permission from '@/views/Permission.vue'
import PermissionSend from '@/views/PermissionSend.vue'
import Setting from '@/views/Setting.vue'
import History from '@/views/History.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/recover-password',
    component: RecoverPassword
  },
  {
    path: '/recover-password/confirm',
    component: RecoverConfirm
  },
  {
    path: '/permission',
    component: Permission
  },
  {
    path: '/permission/send',
    component: PermissionSend
  },
  {
    path: '/setting',
    component: Setting
  },
  {
    path: '/history',
    component: History
  }
  ],
  mode: 'hash'
})