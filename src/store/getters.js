const getters = {
  singerType: state => state.singer.singerType,
  singers: state => state.singer.singers,
  playing: state => state.play.playing,
  fullScreen: state => state.play.fullScreen,
  playList: state => state.play.playList,
  sequenceList: state => state.play.sequenceList,
  mode: state => state.play.mode,
  currentIndex: state => state.play.currentIndex,
  currentSong: (state) => {
    return state.play.playList[state.play.currentIndex] || {}
  }
}
export default getters
