// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
  },
});
