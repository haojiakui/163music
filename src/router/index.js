import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
      path : '/recommoned',
      name:'Recommoned',
      component:() => import(/* webpackChunkName: "about" */ '../views/recommoned.vue')
    },
    {
      path : '/playListView',
      name:'PlayListView',
      component:() => import(/* webpackChunkName: "about" */ '../views/playListView.vue')
    },
    {
      path : '/rank',
      name:'Rank',
      component:() => import(/* webpackChunkName: "about" */ '../views/rank.vue')
    },
    {
      path : '/artists',
      name:'Artists',
      component:() => import(/* webpackChunkName: "about" */ '../views/artists.vue')
    }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
