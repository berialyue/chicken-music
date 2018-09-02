<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="playList">
      <div>
        <div v-if="banners.length" class="slider-wrapper">
          <swiper
            :options="swiperOption"
            ref="mySwiper">
            <!-- slides -->
            <swiper-slide
              v-for="(item, index) of banners"
              :key="index">
              <a :href="item.url">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <!-- <button
          class="button"
          @click="startPlay"
        >开始</button> -->
        <!-- <button class="button" @click="stopPlay">停止</button> -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in playList" :key="index" class="item">
              <div class="icon">
                <img v-lazy="item.coverImgUrl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!playList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import api from '../../api/recommend.js'
import Scroll from '../../base/scroll/scroll'
import Loading from '../../base/loading/loading'

export default {
  name: 'recommend',
  data() {
    return {
      banners: [],
      swiperOption: {
        notNextTick: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        observeParents: true
      },
      playList: [],
      checkLoaded: false
    }
  },
  components: {
    Scroll,
    Loading
  },
  created() {
    this.getBanner()
    this.getPersonalized()
    this.getPlayList()
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    getBanner() {
      api.getBannerResource().then((res) => {
        if (res.data.code === 200) {
          this.banners = res.data.banners
        }
      })
    },
    getPersonalized() {
      api.getPersonalizedResource().then((res) => {
        if (res.data.code === 200) {
          console.log(res)
          console.log(res.data)
        }
      })
    },
    getPlayList() {
      api.getPlayList(10, 'new').then((res) => {
        if (res.data.code === 200) {
          console.log(res)
          console.log(res.data)
          this.playList = res.data.playlists
        }
      })
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .slider-wrapper >>> .swiper-pagination-bullet-active
    background: #ffffff
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-bottom: 46%
        overflow: hidden
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
.img
 width: 100%
.button
  background: #ffffff
  color:#000
</style>
