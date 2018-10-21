import {saveFavorite, deleteFavorite, loadFavorite} from 'common/js/cache'

const favorite = {
  state: {
    favoriteList: loadFavorite()
  },
  mutations: {
    SET_FAVORITE_LIST: (state, favoriteList) => {
      state.favoriteList = favoriteList
    }
  },
  actions: {
    saveFavoriteList({commit}, song) {
      commit('SET_FAVORITE_LIST', saveFavorite(song))
    },
    deleteFavoriteList({commit}, song) {
      commit('SET_FAVORITE_LIST', deleteFavorite(song))
    }
  }
}

export default favorite
