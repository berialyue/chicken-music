<template>
  <transition name="slide">
    <music-list
      :title="title"
      :bgImage="bgImage"
      :songs="songs"
      :rank="rank"
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
      songs: [],
      rank: true
    }
  },
  created() {
    this.getMusicList()
  },
  methods: {
    getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
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
      if (this.songs.length) {
        return this.songs[0].image
      }
      return this.topList.coverImgUrl
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
