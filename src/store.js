import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Tom Nixon'},
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    events: [
      { id: 1, title: 'Tom', organizer: '...' },
      { id: 2, title: '...', organizer: '...' },
      { id: 3, title: '...', organizer: '...' },
      { id: 4, title: '...', organizer: '...' },
    ]
  },
  getters: {
    catLength: state => {
      return state.categories.length;
    },

    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },

    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length;
    },
    //pass in a parameter (id) and use that to find the event that matches in state
    getEventById: state => id => {
      return state.events.find(event => event.id === id);
    }
  },
  mutations: {},
  actions: {}
})
