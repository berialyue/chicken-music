<template>
  <div class="singerItem">
    <div>{{cat}}</div>
    <div>{{limit}}</div>
  </div>
</template>

<script>
import api from '../../../api/singer.js'

export default {
  name: 'singerItem',
  props: {
    cat: {
      type: Number
    },
    limit: {
      type: Number
    }
  },
  created() {
    console.log(this.cat)
    console.log(this.limit)
    this.getSingerList()
  },
  methods: {
    getSingerList() {
      api.getSingerList(this.cat, this.limit).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
