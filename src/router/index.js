import Vue from 'vue'
import Router from 'vue-router'
import Hot from 'components/hot/hot'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import singerClassify from 'src/components/singer/components/singerClassify'
import singerList from 'src/components/singer/components/singerList'
import singerDetail from 'src/components/singerDetail/singerDetail'
import songSheet from 'src/components/songSheet/songSheet'

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
      component: Hot,
      children: [{
        path: ':id',
        name: 'songSheet',
        component: songSheet
      }]
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
