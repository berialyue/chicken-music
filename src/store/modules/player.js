import { playMode } from 'common/js/config'
import {shuffle} from 'common/js/util'

const player = {
  state: {
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1
  },
  mutations: {
    SET_PLAYING_STATE: (state, playing) => {
      state.playing = playing
    },
    SET_FULL_SCREEN: (state, fullScreen) => {
      state.fullScreen = fullScreen
    },
    SET_PLAYLIST: (state, playList) => {
      state.playList = playList
    },
    SET_SEQUENCE_LIST: (state, sequenceList) => {
      state.sequenceList = sequenceList
    },
    SET_PLAY_MODE: (state, mode) => {
      state.mode = mode
    },
    SET_CURRENT_INDEX: (state, currentIndex) => {
      state.currentIndex = currentIndex
    }
  },
  actions: {
    selectPlay({commit, state}, {list, index}) {
      commit('SET_SEQUENCE_LIST', list)
      if (state.mode === playMode.random) {
        let randomList = shuffle(list)
        commit('SET_PLAYLIST', randomList)
        index = findIndex(randomList, list[index])
      } else {
        commit('SET_PLAYLIST', list)
      }
      commit('SET_CURRENT_INDEX', index)
      commit('SET_FULL_SCREEN', true)
      commit('SET_PLAYING_STATE', true)
    },
    randomPlay({commit}, {list}) {
      commit('SET_PLAY_MODE', playMode.random)
      commit('SET_SEQUENCE_LIST', list)
      let randomList = shuffle(list)
      commit('SET_PLAYLIST', randomList)
      commit('SET_CURRENT_INDEX', 0)
      commit('SET_FULL_SCREEN', true)
      commit('SET_PLAYING_STATE', true)
    }
  }
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export default player
