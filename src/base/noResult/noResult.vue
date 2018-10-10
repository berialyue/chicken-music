<template>
  <div class="noResult">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'noResult',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.noResult
  text-align: center
  .no-result-icon
    width: 86px
    height: 90px
    margin: 0 auto
    bg-image('noResult')
    background-size: 86px 90px
  .no-result-text
    margin-top: 30px
    font-size: $font-size-medium
    color: $color-text-d
</style>
