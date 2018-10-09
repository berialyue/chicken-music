<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import searchAPI from 'api/search'
import {filterSinger} from 'common/js/song'

const TYPE_SINGER = 'singer'

export default {
  name: 'suggest',
  data() {
    return {
      page: 1,
      result: []
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    genResult(data) {
      let ret = []
      if (data.result.artists) {
        ret.push({...data.result.artists[0], ...{type: TYPE_SINGER}})
      }
      if (data.result.songs) {
        ret = ret.concat(data.result.songs)
      }
      return ret
    },
    search() {
      searchAPI.getSearch(this.query, this.page).then(res => {
        if (res.data.code === 200) {
          console.log(res.data)
          this.result = this.genResult(res.data)
        }
      })
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.name
      } else {
        return `${item.name}-${filterSinger(item.artists)}`
      }
    }
  },
  watch: {
    query() {
      this.search()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.suggest
  height: 100%
  overflow: hidden
  .suggest-list
    padding: 0 30px
    .suggest-item
      display: flex
      align-items: center
      padding-bottom: 20px
    .icon
      flex: 0 0 30px
      width: 30px
      [class^="icon-"]
        font-size: 14px
        color: $color-text-d
    .name
      flex: 1
      font-size: $font-size-medium
      color: $color-text-d
      overflow: hidden
      .text
        no-wrap()
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
