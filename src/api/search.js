import axios from 'axios'

export default {
  getHotSearch() {
    return axios.get('/api/search/hot')
  },
  getSearch(keywords, page) {
    return axios.get('/api/search', {
      params: {
        keywords,
        offset: (page - 1) * 30
      }
    })
  }
}
