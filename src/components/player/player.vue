<template>
  <div class="player" v-show="playList.length > 0">
    <div class="normalPlayer" v-show="fullScreen">
      播放器
    </div>
    <div class="miniPlayer" v-show="!fullScreen"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'player',
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.normalPlayer
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 150
  background: $color-background
.background
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
  z-index: -1
  opacity: 0.6
  filter: blur(20px)
.top
  position: relative
  margin-bottom: 25px
.back
  position: absolute
  top: 0
  left: 0
  z-index: 50
.icon-back
  display: block
  padding: 9px
  font-size: $font-size-large-x
  color: $color-theme
  transform: rotate(-90deg)
.title
  width: 70%
  margin: 0 auto
  line-height: 40px
  text-align: center
  no-wrap()
  font-size: $font-size-large
  color: $color-text
.subtitle
  line-height: 20px
  text-align: center
  font-size: $font-size-medium
  color: $color-text
.middle
  position: fixed
  width: 100%
  top: 80px
  bottom: 170px
</style>
