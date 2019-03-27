import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router';

Vue.use(Vuex)

let _auth = Axios.create({
  baseURL: '//localhost:3000/auth',
  timeout: 3000
})

let _api = Axios.create({
  baseURL: '//localhost:3000/api/wifles',
  timeout: 3000
})

export default new Vuex.Store({
  state: {
    user: {},
    wifles: []
  },
  mutations: {
    user(state, user) {
      state.user = user
    },
    wifles(state, data) {
      state.wifles = data
    }
  },
  actions: {
    //#region -- USERS --
    login({commit}, payload) {
      _auth.post('login', payload) 
        .then(res => {
          console.log(res)
          commit('user', res.data)
          router.push({name: 'wifles'})
        })
        .catch(e => console.error(e))
    },
    register({commit}, payload) {
      _auth.post('register', payload) 
        .then(res => {
          console.log(res)
          commit('user', res.data)          
          router.push({name: 'wifles'})
        })
        .catch(e => console.error(e))
    },
    // #endregion

    //#region -- WIFFLES --
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
    //#endregion
  }
})
