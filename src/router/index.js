import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import singerList from 'src/components/singer/components/singerList'
import singerContent from 'src/components/singer/components/singerContent'

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
        name: 'singerList',
        component: singerList
      }, {
        path: 'chinesemale',
        name: 'chineseMale',
        component: singerContent
      }, {
        path: 'chinesefemale',
        name: 'chineseFemale',
        component: singerContent
      }, {
        path: 'chineseband',
        name: 'chineseBand',
        component: singerContent
      }, {
        path: 'occidentmale',
        name: 'occidentMale',
        component: singerContent
      }, {
        path: 'occidentfemale',
        name: 'occidentFemale',
        component: singerContent
      }, {
        path: 'occidentband',
        name: 'occidentBand',
        component: singerContent
      }, {
        path: 'japanesemale',
        name: 'japaneseMale',
        component: singerContent
      }, {
        path: 'japanesefemale',
        name: 'japaneseFemale',
        component: singerContent
      }, {
        path: 'japaneseband',
        name: 'japaneseBand',
        component: singerContent
      }, {
        path: 'koreamale',
        name: 'koreaMale',
        component: singerContent
      }, {
        path: 'koreafemale',
        name: 'koreaFemale',
        component: singerContent
      }, {
        path: 'koreaband',
        name: 'koreaBand',
        component: singerContent
      }, {
        path: 'othermale',
        name: 'otherMale',
        component: singerContent
      }, {
        path: 'otherfemale',
        name: 'otherFemale',
        component: singerContent
      }, {
        path: 'otherband',
        name: 'otherBand',
        component: singerContent
      }]
    }
  ]
})
