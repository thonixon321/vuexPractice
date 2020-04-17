import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Tom Nixon'},
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [],
    eventLimit: '',
    event: {}
  },

  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },

    SET_EVENTS(state, events) {
      state.events = events
    },

    SET_EVENT(state, event) {
      state.event = event
    },

    SET_EVENT_LIMIT(state, value) {
      state.eventLimit = parseInt(value)
    }
  },

  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })

    },

    fetchEvents({ commit }, { perPage, page }) {

      EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENT_LIMIT', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    },

    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id);
      //if the getter finds this event by its id in our state,
      //then we don't need to make an api call, we can just access it from
      //the data already stored
      if (event) {
        commit('SET_EVENT', event)
      }
      else{
        EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
      }

    }

  }
})
