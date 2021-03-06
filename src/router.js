import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Person from './views/person.vue'
import Login from './views/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/person/:id',
      name: 'person',
      component: Person
    },
    {
      path: '/login/',
      name: 'login',
      component: Login
    },

  ]
})
