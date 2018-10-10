<template>
  <scroll
    class="suggest"
    :data="result"
    :pullUp="pullUp"
    @scrollToEnd="searchMore"
    ref="suggest">
    <ul class="suggest-list">
      <li
        @click="selectItem(item)"
        class="suggest-item"
        v-for="(item, index) in result"
        :key="index"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper"  v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import searchAPI from 'api/search'
import {createSearchSong} from 'common/js/song'
import {getSongUrl} from 'common/js/util'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import {mapMutations, mapActions} from 'vuex'
import noResult from 'base/noResult/noResult'

const TYPE_SINGER = 'singer'

export default {
  name: 'suggest',
  data() {
    return {
      page: 1,
      result: [],
      limit: 30,
      pullUp: true,
      hasMore: true
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
        ret = ret.concat(this.normalizeSongs(data.result.songs))
        console.log(ret)
      }
      return ret
    },
    checkMore(data) {
      const song = data.result
      if (!song.songs || (!song.songs.length || (song.songs.length + (this.page - 1) * this.limit) >= song.songCount)) {
        this.hasMore = false
      }
    },
    search() {
      this.page = 1
      this.$refs.suggest.scrollTo(0, 0)
      this.hasMore = true
      searchAPI.getSearch(this.query, this.page, this.limit).then(res => {
        if (res.data.code === 200) {
          console.log(res.data)
          this.result = this.genResult(res.data)
          this.checkMore(res.data)
        }
      })
    },
    searchMore() {
      if (!this.hasMore) {
        return undefined
      }
      this.page++
      searchAPI.getSearch(this.query, this.page, this.limit).then(res => {
        if (res.data.code === 200) {
          console.log(res.data)
          this.result = this.result.concat(this.genResult(res.data))
          this.checkMore(res.data)
        }
      })
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.id,
          name: item.name
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
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
        return `${item.name}-${item.singer}`
      }
    },
    normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.id && musicData.album.id) {
          ret.push(createSearchSong(musicData))
        }
      })
      getSongUrl(ret)
      return ret
    },
    ...mapMutations({
      setSinger: 'SET_SINGERS'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query() {
      this.search()
    }
  },
  components: {
    Scroll,
    Loading,
    noResult
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
