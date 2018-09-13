import axios from 'axios'

export default {
  getSingerList(cat, limit) {
    return axios.get('/api/artist/list', {
      params: {
        cat: cat,
        limit: limit
      }
    })
  },
  getSingerDetail(singerId) {
    return axios.get('/api/artists', {
      params: {
        id: singerId
      }
    })
  },
  getSongUrl(songId) {
    return axios.get('/api/music/url', {
      params: {
        id: songId
      }
    })
  }
}
