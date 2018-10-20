<template>
  <transition name="drop">
    <div class="topTip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'topTip',
  props: {
    delay: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    hide() {
      this.showFlag = false
    },
    show() {
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.topTip
  position: fixed
  top: 0
  width: 100%
  z-index: 500
  background: $color-dialog-background
  &.drop-enter-active, &.drop-leave-active
    transition: all 0.3s
  &.drop-enter, &.drop-leave-to
    transform: translate3d(0, -100%, 0)
</style>

