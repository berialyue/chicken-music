import axios from 'axios'

export default {
  getSongUrl(songId) {
    return axios.get('/api/music/url', {
      params: {
        id: songId
      }
    })
  },
  getLyric(songId) {
    return axios.get('/api/lyric', {
      params: {
        id: songId
      }
    })
  }
}
