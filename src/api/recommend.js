import axios from 'axios'

export default {
  getBannerResource() {
    return axios.get('/api/banner')
  },
  getPersonalizedResource() {
    return axios.get('/api/personalized')
  },
  getSongSheet(limit, order) {
    return axios.get('/api/top/playlist', {
      params: {
        limit: limit,
        order: order
      }
    })
  },
  getSongSheetDetail(id) {
    return axios.get('/api/playlist/detail', {
      params: {
        id
      }
    })
  }
}
