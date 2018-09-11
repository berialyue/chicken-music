const singer = {
  state: {
    singerType: sessionStorage.getItem('singerType') || '',
    singers: {}
  },
  mutations: {
    SET_SINGERTYPE: (state, singerType) => {
      state.singerType = singerType
      sessionStorage.setItem('singerType', singerType)
    },
    SET_SINGERS: (state, singers) => {
      state.singers = singers
    }
  },
  actions: {

  }
}

export default singer
