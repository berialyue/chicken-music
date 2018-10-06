const getters = {
  singerType: state => state.singer.singerType,
  singers: state => state.singer.singers,
  playing: state => state.player.playing,
  fullScreen: state => state.player.fullScreen,
  playList: state => state.player.playList,
  sequenceList: state => state.player.sequenceList,
  mode: state => state.player.mode,
  currentIndex: state => state.player.currentIndex,
  currentSong: (state) => {
    return state.player.playList[state.player.currentIndex] || {}
  },
  songSheet: state => state.song.songSheet,
  topList: state => state.rank.topList
}
export default getters
