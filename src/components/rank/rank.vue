<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li class="item" v-for="(item,index) in topList" :key="index">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" width="100" height="100">
          </div>
          <ul class="songlist">
            <li
              class="song"
              v-for="(song,index) in item.tracks"
              :key="index"
              v-if="index < 3">
              <span>{{index+1}}</span>
              <span>{{song.name}}-{{song.ar[0].name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import api from 'api/rank'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playListMixin} from 'common/js/mixin'

export default {
  name: 'rank',
  data() {
    return {
      topList: []
    }
  },
  mixins: [
    playListMixin
  ],
  created() {
    this.getTopList()
  },
  methods: {
    getTopList() {
      for (let i = 0; i <= 22; i++) {
        api.getTopList(i).then(res => {
          if (res.data.code === 200) {
            this.topList.push(res.data.playlist)
            if (i === 22) {
              console.log(this.topList)
            }
          }
        })
      }
    },
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.toplist.refresh()
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
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
