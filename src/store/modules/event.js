import EventService from '@/services/EventService'
//now all the actions, mutations, and getters will be namespaced under
//the module name 'event'
export const namespaced = true

export const state =  {
  events: [],
  eventLimit: '',
  event: {}
}

export const getters = {
  //passes in the id as a argument to find a particular event in events
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}

export const mutations = {
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
}

export const actions = {
  createEvent({ commit, dispatch, rootState }, event) {
    //access the user module state with the rootState
    console.log('User creating Event is ' + rootState.user.user.name)

    //access actions, mutations, and getters globally (aka the root $store)
    //don't need to access the module name (to avoid overlap complications, use namespacing),
    //however, this dispatch is fine when this is namespaced, because the action is inside this module
    // example: dispatch('someActionSomwhere')

    //if I did need to call an action from another module....
    //(second argument is the payload, third is the root of our store)
    // example: dispatch('moduleName/actionToCall', null, { root: true })


    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
      const notification = {
        type: 'success',
        message: 'Event successfully added!'
      }
      dispatch('notification/add', notification, { root: true })
    }).catch(error => {
      const notification = {
        type: 'error',
        message: 'There was a problem creating your event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
      //propogate the error to component (component has a catch in it's dispatch)
      throw error
    })

  },

  fetchEvents({ commit, dispatch }, { perPage, page }) {

    EventService.getEvents(perPage, page)
    .then(response => {
      commit('SET_EVENT_LIMIT', response.headers['x-total-count'])
      commit('SET_EVENTS', response.data)
    })
    .catch(error => {
      const notification = {
        type: 'error',
        message: 'There was a problem fetching events: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
    })
  },

  fetchEvent({ commit, getters, dispatch }, id) {
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
        const notification = {
          type: 'error',
          message: 'There was a problem fetching event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
    }

  }

}