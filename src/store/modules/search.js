import {saveSearch, loadSearch, deleteSearch, clearSearch} from 'common/js/cache'

const search = {
  state: {
    searchHistory: loadSearch()
  },
  mutations: {
    SET_SEARCH_HISTORY: (state, searchHistory) => {
      state.searchHistory = searchHistory
    }
  },
  actions: {
    saveSearchHistory({commit}, query) {
      commit('SET_SEARCH_HISTORY', saveSearch(query))
    },
    deleteSearchHistory({commit}, query) {
      commit('SET_SEARCH_HISTORY', deleteSearch(query))
    },
    clearSearchHistory({commit}) {
      commit('SET_SEARCH_HISTORY', clearSearch())
    }
  }
}

export default search
