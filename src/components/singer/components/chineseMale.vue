<template>
  <div class="chineseMale">
    chineseMale
  </div>
</template>

<script>
import api from '../../../api/singer.js'

export default {
  name: 'chineseMale',
  created() {
    this.getSingerList()
  },
  methods: {
    getSingerList() {
      api.getSingerList(1001, 100).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

