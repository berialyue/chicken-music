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
    },
    insertSong ({commit, state}, song) {
      let playList = state.playList.slice()
      let sequenceList = state.sequenceList.slice()
      let currentIndex = state.currentIndex
      // 记录当前歌曲
      let currentSong = playList[currentIndex]
      // 查找当前列表中是否存在待插入的歌曲并返回其索引
      let fpIndex = findIndex(playList, song)
      // 因为要插入歌曲，所以将索引+1
      currentIndex++
      // 插入这首歌到当前索引位置
      playList.splice(currentIndex, 0, song)
      // 如果已经包含这首歌
      if (fpIndex > -1) {
        // 如果当前插入的序号大于列表中的序号
        if (currentIndex > fpIndex) {
          playList.splice(fpIndex, 1)
          currentIndex--
        } else {
          playList.splice(fpIndex + 1, 1)
        }
      }

      let currentSIndex = findIndex(sequenceList, currentSong) + 1

      let fsIndex = findIndex(sequenceList, song)

      sequenceList.splice(currentSIndex, 0, song)

      if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
          sequenceList.splice(fsIndex, 1)
        } else {
          sequenceList.splice(fsIndex + 1, 1)
        }
      }

      commit('SET_PLAYLIST', playList)
      commit('SET_SEQUENCE_LIST', sequenceList)
      commit('SET_CURRENT_INDEX', currentIndex)
      commit('SET_FULL_SCREEN', true)
      commit('SET_PLAYING_STATE', true)
    },
    deleteSong({commit, state}, song) {
      let playList = state.playList.slice()
      let sequenceList = state.sequenceList.slice()
      let currentIndex = state.currentIndex
      let pIndex = findIndex(playList, song)
      playList.splice(pIndex, 1)
      let sIndex = findIndex(sequenceList, song)
      sequenceList.splice(sIndex, 1)

      if (currentIndex > pIndex || currentIndex === playList.length) {
        currentIndex--
      }

      commit('SET_PLAYLIST', playList)
      commit('SET_SEQUENCE_LIST', sequenceList)
      commit('SET_CURRENT_INDEX', currentIndex)
      if (!playList.length) {
        commit('SET_PLAYING_STATE', false)
      } else {
        commit('SET_PLAYING_STATE', true)
      }
    }
  }
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    console.log(item)
    console.log(song)
    return item.id === song.id
  })
}

export default player
