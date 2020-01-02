import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,

    authenticated: false,
    admin: false,
    changes: false,

    user: {
      experience:10010,
      cash:30153,
      bank:1000,
      counter:{crime:86,organized_crime:10},
      cooldown:{crime:"2020-01-02T17:19:50+01:00",organized_crime:"2020-01-02T17:22:43+01:00"},
      created_at:"2019-12-30T16:04:58+01:00",
      updated_at:"2020-01-02T17:19:45+01:00"
    },
    crimeCooldown: "2020-01-02T11:28:21+0100",
    organizedCrimeCooldown: "2020-01-02T11:28:21+0100"
  },
  getters: {
    crimeCooldown: state => state.user.cooldown.crime,
    organizedCrimeCooldown: state => state.user.cooldown.organized_crime,
  },
  mutations: {
    // TEMPLATE
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SCRIM (state, payload) {
      state.barColor = payload
    },
    // CUSTOM
    setAuth (state, payload) {
      state.authenticated = payload
    },
    setAdmin (state, payload) {
      state.admin = payload
    },
    setChanges (state, payload) {
      state.changes = payload
    },

    setUser (state, payload) {
      state.user = payload
    },
    setCrimeCooldown (state, payload) {
      state.user.cooldown.crime = payload
    },
    setOrganizedCrimeCooldown (state, payload) {
      state.user.cooldown.organized_crime = payload
    }
  },
  actions: {

  },
})
