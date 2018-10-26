import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/hot'
    },
    {
      path: '/hot',
      name: 'Hot',
      component: () => import('../components/hot/hot.vue'),
      children: [{
        path: ':id',
        name: 'songSheet',
        component: () => import('../components/songSheet/songSheet.vue')
      }]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: () => import('../components/rank/rank.vue'),
      children: [
        {
          path: ':id',
          component: () => import('../components/topList/topList.vue')
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../components/search/search.vue'),
      children: [{
        path: ':id',
        component: () => import('../components/singerDetail/singerDetail.vue')
      }]
    },
    {
      path: '/singer',
      component: () => import('../components/singer/singer.vue'),
      children: [{
        path: '',
        name: 'singerClassify',
        component: () => import('../components/singer/components/singerClassify.vue')
      }, {
        path: 'list',
        name: 'singerList',
        component: () => import('../components/singer/components/singerList.vue'),
        children: [{
          path: ':id',
          component: () => import('../components/singerDetail/singerDetail.vue')
        }]
      }]
    },
    {
      path: '/user',
      name: 'userCenter',
      component: () => import('../components/userCenter/userCenter.vue')
    }
  ]
})
