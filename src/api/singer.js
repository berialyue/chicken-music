import axios from 'axios'

export default {
  getSingerList(cat, limit) {
    return axios.get('/api/artist/list', {
      params: {
        cat: cat,
        limit: limit
      }
    })
  }
}
