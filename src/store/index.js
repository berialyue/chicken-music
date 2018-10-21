import Vue from 'vue'
import Vuex from 'vuex'
import singer from './modules/singer'
import player from './modules/player'
import song from './modules/song'
import rank from './modules/rank'
import search from './modules/search'
import favorite from './modules/favorite'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    singer,
    player,
    song,
    rank,
    search,
    favorite
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
