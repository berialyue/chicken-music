<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import musicList from 'components/musicList/musicList'
import {mapGetters} from 'vuex'
import api from 'api/hot.js'
import { createSong } from 'common/js/song'
import {getSongUrl} from 'common/js/util'

export default {
  name: 'songSheet',
  data () {
    return {
      songs: []
    }
  },
  components: {
    musicList
  },
  created() {
    this.getSongSheetDetail()
  },
  methods: {
    normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item))
      })
      getSongUrl(ret)
      return ret
    },
    getSongSheetDetail() {
      if (!this.songSheet.id) {
        this.$router.push('/hot')
        return
      }
      api.getSongSheetDetail(this.songSheet.id).then((res) => {
        if (res.data.code === 200) {
          this.songs = this.normalizeSongs(res.data.playlist.tracks)
        }
      })
    }
  },
  computed: {
    title() {
      return this.songSheet.name
    },
    bgImage() {
      return this.songSheet.coverImgUrl
    },
    ...mapGetters([
      'songSheet'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
