<template>
  <transition name="slide">
    <music-list
      :title="title"
      :bgImage="bgImage"
    ></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/musicList/musicList'
import {mapGetters} from 'vuex'

export default {
  name: 'topList',
  computed: {
    title() {
      return this.topList.name
    },
    bgImage() {
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
