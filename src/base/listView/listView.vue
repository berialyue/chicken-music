<template>
  <scroll class="listView" :data="data" ref="listview">
    <ul>
      <li v-for="(group,index) in data" class="list-group" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item,index) in group.items" class="list-group-item" :key="index">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
         <li v-for="(item, index) in shortcutList" :key="index" class="item" :data-index="index">
           {{item}}
         </li>
      </ul>
    </div>
    <div class="loading-container" v-show="data.length === 0">
        <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from '../loading/loading'
import { getData } from 'common/js/dom.js'

const ANCHOR_HEIGHT = 18

export default {
  name: 'listView',
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  created() {
    this.touch = {}
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    onShortcutTouchStart(el) {
      let anchorIndex = getData(el.target, 'index')
      let firstTouch = el.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this.scrollTo(anchorIndex)
    },
    onShortcutTouchMove(el) {
      let firstTouch = el.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = this.touch.anchorIndex + delta
      this.scrollTo(anchorIndex)
    },
    scrollTo(index) {
      this.$refs.scrollToElement(this.$refs.listGroup[index], 0)
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.listView
  position: relative
  height: 100vh
  width: 100%
  overflow: hidden
  background: $color-background
.list-group
  padding-bottom: 30px
.list-group-title
  height: 30px
  line-height: 30px
  padding-left: 20px
  font-size: $font-size-small
  color: $color-text-l
  background: $color-highlight-background
.list-group-item
  display: flex
  align-items: center
  padding: 20px 0 0 30px
.avatar
  width: 50px
  height: 50px
  border-radius: 25px
.name
  margin-left: 20px
  color: $color-text-l
  font-size: $font-size-medium
.list-shortcut
  position: absolute
  z-index: 30
  right: 0
  top: 45%
  transform: translateY(-50%)
  width: 20px
  padding: 20px 0
  border-radius: 10px
  text-align: center
  background: $color-background-d
  font-family: Helvetica
.item
  padding: 3px
  line-height: 1
  color: $color-text-l
  font-size: $font-size-small
  &.current
    color: $color-theme
.loading-container
  position: absolute
  width: 100%
  top: 35%
  transform: translateY(-50%)
</style>
