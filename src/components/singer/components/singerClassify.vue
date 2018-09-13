<template>
  <div class="singerClassify">
    <div class="singer-classify">
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('chinesemale')">华语男歌手</router-link>
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('chinesefemale')">华语女歌手</router-link>
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('chineseband')">华语乐队/组合</router-link>
    </div>
    <div class="singer-classify">
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('occidentmale')">欧美男歌手</router-link>
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('occidentfemale')">欧美女歌手</router-link>
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('occidentband')">欧美乐队/组合</router-link>
    </div>
    <div class="singer-classify">
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('japanesemale')">日本男歌手</router-link>
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('japanesefemale')">日本女歌手</router-link>
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('japaneseband')">日本乐队/组合</router-link>
    </div>
    <div class="singer-classify">
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('koreamale')">韩国男歌手</router-link>
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('koreafemale')">韩国女歌手</router-link>
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('koreaband')">韩国乐队/组合</router-link>
    </div>
    <div class="singer-classify">
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('othermale')">其他男歌手</router-link>
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('otherfemale')">其他女歌手</router-link>
      <router-link to="/singer/list" class="singer-item" @click.native="setSingerType('otherband')">其他乐队/组合</router-link>
    </div>
  </div>
</template>

<script>
import singerItem from './singerItem'

export default {
  name: 'singerClassify',
  methods: {
    clickTo(add) {
      this.$router.push(add)
    },
    setSingerType(singerType) {
      console.log('singertype')
      return this.$store.commit('SET_SINGERTYPE', singerType)
    }
  },
  components: {
    singerItem
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.singerClassify
  height: calc(100vh - 88px)
.singer-classify
  display: flex
  flex-direction: column
  margin: 10px 0
.singer-item
  margin-bottom: 2px
  height: 40px
  line-height: 40px
  background-color: rgba(255,255,255,0.1)
  color: $color-theme
  text-align: center
.singer-item:active
  background-color: rgba(255,255,255,0.4)
</style>
