import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let _api = Axios.create({
  baseURL: '//localhost:3000/api/wifles',
  timeout: 3000
})

export default new Vuex.Store({
  state: {
    wifles: []
  },
  mutations: {
    wifles(state, data) {
      state.wifles = data
    }
  },
  actions: {
    getWifles({commit}) {
      _api.get('/')
        .then(res => {
          console.log(res)
          commit('wifles', res.data)
        })
        .catch(e => console.error(e))
    },
    createWifle({dispatch}, wifle) {
      _api.post('/', wifle)
        .then(res => {
          console.log(res)
          dispatch('getWifles')
        })
        .catch(e => console.error(e))
    }
  }
})
