<template>
  <div class="singerContent">
    <singer-item :cat="1001" :limit="100" v-if="singerType === 'chinesemale'"></singer-item>
    <singer-item :cat="1002" :limit="100" v-if="singerType === 'chinesefemale'"></singer-item>
    <singer-item :cat="1003" :limit="100" v-if="singerType === 'chineseband'"></singer-item>
    <singer-item :cat="2001" :limit="100" v-if="singerType === 'occidentmale'"></singer-item>
    <singer-item :cat="2002" :limit="100" v-if="singerType === 'occidentfemale'"></singer-item>
    <singer-item :cat="2003" :limit="100" v-if="singerType === 'occidentband'"></singer-item>
    <singer-item :cat="6001" :limit="100" v-if="singerType === 'japanesemale'"></singer-item>
    <singer-item :cat="6002" :limit="100" v-if="singerType === 'japanesefemale'"></singer-item>
    <singer-item :cat="6003" :limit="100" v-if="singerType === 'japaneseband'"></singer-item>
    <singer-item :cat="7001" :limit="100" v-if="singerType === 'koreamale'"></singer-item>
    <singer-item :cat="7002" :limit="100" v-if="singerType === 'koreafemale'"></singer-item>
    <singer-item :cat="7003" :limit="100" v-if="singerType === 'koreaband'"></singer-item>
    <singer-item :cat="4001" :limit="100" v-if="singerType === 'othermale'"></singer-item>
    <singer-item :cat="4002" :limit="100" v-if="singerType === 'otherfemale'"></singer-item>
    <singer-item :cat="4003" :limit="100" v-if="singerType === 'otherband'"></singer-item>
  </div>
</template>

<script>
import singerItem from './singerItem'
import store from '../../../store'

export default {
  name: 'chineseMale',
  data() {
    return {
      singerType: store.getters.singerType
    }
  },
  components: {
    singerItem
  }
}
</script>

<style lang="stylus" scoped>
 @import "~common/stylus/variable"
  .title
    padding: 10px 0
    text-align: center
    color: $color-theme
    font-size: $font-size-medium
</style>

