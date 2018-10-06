<template>
  <transition name="slide">
    <music-list
      :title="title"
      :bgImage="bgImage"
      :songs="songs"
    ></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/musicList/musicList'
import {mapGetters} from 'vuex'
// import api from 'api/rank'
import { createSong } from 'common/js/song'
import {getSongUrl} from 'common/js/util'

export default {
  name: 'topList',
  data() {
    return {
      songs: []
    }
  },
  created() {
    this.getMusicList()
  },
  methods: {
    getMusicList() {
      this.songs = this.normalizeSongs(this.topList.tracks)
    },
    normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item))
      })
      getSongUrl(ret)
      return ret
    }
  },
  computed: {
    title() {
      return this.topList.name
    },
    bgImage() {
      return this.topList.tracks[0].al.picUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
