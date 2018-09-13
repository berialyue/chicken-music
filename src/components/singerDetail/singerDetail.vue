<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import api from 'api/singer'
import { createSong } from 'common/js/song'
import musicList from 'components/musicList/musicList'

export default {
  name: 'singerDetail',
  data() {
    return {
      songs: [],
      songUrl: ''
    }
  },
  computed: {
    title() {
      return this.singers.name
    },
    bgImage() {
      return this.singers.avatar
    },
    ...mapGetters([
      'singers'
    ])
  },
  created() {
    console.log(this.singers.id)
    this.getSingerDetail()
  },
  methods: {
    getSingerDetail() {
      if (!this.singers.id) {
        this.$router.push('/singer/list')
        return
      }
      api.getSingerDetail(this.singers.id).then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.songs = this.normalizeSongs(res.data.hotSongs)
        }
      })
    },
    getSongUrl(songId) {
      return api.getSongUrl(songId)
    },
    normalizeSongs(list) {
      console.log(list)
      let ret = []
      list.forEach((item) => {
        if (item.id) {
          this.getSongUrl(item.id).then(res => {
            if (res.data.code === 200) {
              this.songUrl = res.data.data[0].url
            }
            ret.push(createSong(item, this.songUrl))
          })
        }
      })
      console.log(ret)
      return ret
    }
  },
  components: {
    musicList
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active,.slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
