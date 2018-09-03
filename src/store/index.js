import Vue from 'vue'
import Vuex from 'vuex'
import singer from './modules/singer'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    singer
  },
  getters
})

export default store
