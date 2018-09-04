<template>
  <div class="singerItem">
    <div>{{cat}}</div>
    <div>{{limit}}</div>
  </div>
</template>

<script>
import api from '../../../api/singer.js'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  name: 'singerItem',
  data() {
    return {
      singers: []
    }
  },
  props: {
    cat: {
      type: Number
    },
    limit: {
      type: Number
    }
  },
  created() {
    this.getSingerList()
  },
  methods: {
    getSingerList() {
      api.getSingerList(this.cat, this.limit).then((res) => {
        if (res.data.code === 200) {
          this.singers = res.data.artists
          console.log(this.singers)
        }
      })
    },
    normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push({
            id: item.id,
            name: item.name,
            avatar: item.picUrl
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
