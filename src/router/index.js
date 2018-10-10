import Vue from 'vue'
import Router from 'vue-router'
import Hot from 'components/hot/hot'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import singerClassify from 'components/singer/components/singerClassify'
import singerList from 'components/singer/components/singerList'
import singerDetail from 'components/singerDetail/singerDetail'
import songSheet from 'components/songSheet/songSheet'
import topList from 'components/topList/topList'

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
      component: Rank,
      children: [
        {
          path: ':id',
          component: topList
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      children: [{
        path: ':id',
        component: singerDetail
      }]
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
