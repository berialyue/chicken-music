<template>
  <transition name="slide">
    <div class="userCenter">
      <div class="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches
          :currentIndex="currentIndex"
          :switches="switches"
          @switch="switchItem"
        ></switches>
      </div>
      <div class="play-btn" ref="playBtn">
        <i class="icon-play"></i>
        <span class="text">随机播放全部歌曲</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">

      </div>
    </div>
  </transition>
</template>

<script>
import switches from 'base/switches/switches'

export default {
  name: 'userCenter',
  data() {
    return {
      currentIndex: 0,
      switches: [
        {
          name: '我喜欢的'
        }, {
          name: '最近听的'
        }
      ]
    }
  },
  methods: {
    switchItem(index) {
      this.currentIndex = index
    }
  },
  components: {
    switches
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.userCenter
  position: fixed
  top: 0
  bottom: 0
  z-index: 100
  width: 100%
  background: $color-background
  &.slide-enter-active, &.slide-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .back
    position: absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
  .switches-wrapper
    margin: 10px 0 30px 0
  .play-btn
    box-sizing: border-box
    width: 135px
    padding: 7px 0
    margin: 0 auto
    text-align: center
    border: 1px solid $color-text-l
    color: $color-text-l
    border-radius: 100px
    font-size: 0
    .icon-play
      display: inline-block
      vertical-align: middle
      margin-right: 6px
      font-size: $font-size-medium-x
    .text
      display: inline-block
      vertical-align: middle
      font-size: $font-size-small
  .list-wrapper
    position: absolute
    top: 110px
    bottom: 0
    width: 100%
    .list-scroll
      height: 100%
      overflow: hidden
      .list-inner
        padding: 20px 30px
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
