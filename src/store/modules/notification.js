export const namespaced = true;

export const state = {
  notifications: []
}

let nextId = 1

export const mutations = {
  PUSH(state, notification) {
    notification.id = nextId++
    //notification is an object, so we use ... to destructure it
    //and then add an id property to it
    state.notifications.push(notification)
  },

  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    )
  }
}

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)

  },

  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}