import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 根目录的子路由，优化路由，防止每次回退或进入都会加载
    children: [
      {
        path : '/recommoned',
        name:'Recommoned',
        component:() => import(/* webpackChunkName: "about" */ '../views/recommoned.vue')
      },
      {
        path : '/playListView',
        name:'PlayListView',
        component:() => import(/* webpackChunkName: "about" */ '../views/playListView.vue'),
        children:[
          {
            path : ':id',//传入id值，指明是哪一个playlist
            name:'PlayListViewInfo',
            component:() => import(/* webpackChunkName: "about" */ '../views/playListInfo.vue')
          }
        ]
      },
      {
        path : '/rank',
        name:'Rank',
        component:() => import(/* webpackChunkName: "about" */ '../views/rank.vue'),
        children:[
          {
            path : ':id',
            name:'RankInfo',
            component:() => import(/* webpackChunkName: "about" */ '../views/rankInfo.vue')
          }
        ]
      },
      {
        path : '/artists',
        name:'Artists',
        component:() => import(/* webpackChunkName: "about" */ '../views/artists.vue'),
        children: [
          {
            path : ':id',
            name:'ArtistsInfo',
            component:() => import(/* webpackChunkName: "about" */ '../views/artistsInfo.vue')
          }
        ]
      }
    ]
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
