<template>
  <div>
    <div class="recommend">
      <div class="recommend-content">
        <div v-if="banners.length" class="slider-wrapper">
          <swiper
            :options="swiperOption"
            ref="mySwiper"
            :mouseenter="stopPlay"
            :mouseleave="play"
          >
            <!-- slides -->
            <swiper-slide
              v-for="(item, index) of banners"
              :key="index"
            >
              <a :href="item.url">
                <img :src="item.picUrl">
              </a>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <ul></ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'recommend',
  data() {
    return {
      banners: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 1000,
          disableOnInteraction: false
        },
        loop: true
      }
    }
  },
  created() {
    this.getBanner()
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    getBanner() {
      this.axios.get('/api/banner').then((res) => {
        if (res.data.code === 200) {
          console.log(res)
          console.log(res.data)
          console.log(res.data.banners)
          this.banners = res.data.banners
        }
      })
    },
    stopPlay() {
      this.swiper.el.onmouseover = function() {
        this.swiperOption.autoplay.stop()
      }
    },
    play() {
      this.swiper.startAutoplay()
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
</style>
