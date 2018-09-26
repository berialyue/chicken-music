<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import singerAPI from 'api/singer'
import songAPI from 'api/song'
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
      singerAPI.getSingerDetail(this.singers.id).then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.songs = this.normalizeSongs(res.data.hotSongs)
        }
      })
    },
    getSongUrl(list) {
      return new Promise((resolve) => {
        list.forEach((item, index) => {
          songAPI.getSongUrl(item.id).then(res => {
            if (res.data.code === 200) {
              item.url = res.data.data[0].url
            }
          })
        })
        return resolve(list)
      })
    },
    normalizeSongs(list) {
      console.log(list)
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item))
      })
      this.getSongUrl(ret).then(value => {
        setTimeout(() => {
          this.deleteNull(value)
        }, 1000)
      })
      console.log(ret)
      return ret
    },
    deleteNull(list) {
      let i = list.length
      while (i--) {
        if (list[i].url === null) {
          list.splice(i, 1)
        }
      }
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
