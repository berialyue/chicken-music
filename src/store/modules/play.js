import { playMode } from 'common/js/config'

const play = {
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

  }
}

export default play
