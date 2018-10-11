import {saveSearch} from 'common/js/cache'

const search = {
  state: {
    searchHistory: []
  },
  mutations: {
    SET_SEARCH_HISTORY: (state, searchHistory) => {
      state.searchHistory = searchHistory
    }
  },
  actions: {
    saveSearchHistory({commit}, query) {
      commit('SET_SEARCH_HISTORY', saveSearch(query))
    }
  }
}

export default search
