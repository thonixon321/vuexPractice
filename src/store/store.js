import Vue from 'vue'
import Vuex from 'vuex'

//import all public items into the user namespace - so user.user can
//access the value that was exported from this file
import * as user from './modules/user'
import * as event from './modules/event'
import * as notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
  },
  state: {
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community']
  }
})
