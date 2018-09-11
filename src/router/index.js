import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import singerClassify from 'src/components/singer/components/singerClassify'
import singerList from 'src/components/singer/components/singerList'
import singerDetail from 'src/components/singerDetail/singerDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: '',
        name: 'singerClassify',
        component: singerClassify
      }, {
        path: 'list',
        name: 'singerList',
        component: singerList,
        children: [{
          path: ':id',
          component: singerDetail
        }]
      }]
    }
  ]
})
