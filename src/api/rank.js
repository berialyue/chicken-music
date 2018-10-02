import axios from 'axios'

export default {
  getTopList(idx) {
    return axios.get('/api/top/list', {
      params: {
        idx: idx
      }
    })
  }
}
