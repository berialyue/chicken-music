const singer = {
  state: {
    singerType: sessionStorage.getItem('singerType') || ''
  },
  mutations: {
    SET_SINGERTYPE: (state, singerType) => {
      state.singerType = singerType
      sessionStorage.setItem('singerType', singerType)
    }
  },
  actions: {

  }
}

export default singer
