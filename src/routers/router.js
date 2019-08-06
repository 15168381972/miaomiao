import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie/index'
import cinemaRouter from './cinema/index'
import mineRouter from './mine/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    movieRouter,
    cinemaRouter,
    mineRouter,
    { 
      path: '/*', 
      redirect: '/movie' 
    }
  ]
})
