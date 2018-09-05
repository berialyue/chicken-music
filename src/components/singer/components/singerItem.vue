<template>
  <div class="singerItem">
    <div>{{cat}}</div>
    <div>{{limit}}</div>
  </div>
</template>

<script>
import api from '../../../api/singer.js'
import Singer from 'common/js/singer'
import getFirstLetter from 'common/js/pinyin.js'

const HOT_NAME = '热门'
const OTHER_NAME = '其他'
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
          console.log(this.normalizeSinger(this.singers))
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
          map.hot.items.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.picUrl
          }))
        }
        const key = getFirstLetter(item.name)
        if (key === 'other') {
          if (!map[key]) {
            map[key] = {
              title: OTHER_NAME,
              items: []
            }
          }
        } else {
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
        }
        map[key].items.push(new Singer({
          id: item.id,
          name: item.name,
          avatar: item.picUrl
        }))
      })
      // 处理map，得到有序列表
      let hot = []
      let other = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        } else if (val.title === OTHER_NAME) {
          other.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      ret.forEach((item, index) => {
        item.items.sort((a, b) => {
          return a.name.charCodeAt(0) - b.name.charCodeAt(0)
        })
      })
      console.log(ret)
      return hot.concat(ret, other)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
