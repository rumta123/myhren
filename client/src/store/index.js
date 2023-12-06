// В файле store/index.js (в Vuex)

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedTour: null,
    selectedDate: null,
  },
  mutations: {
    SET_SELECTED_TOUR(state, index) {
      state.selectedTour = index;
    },
    SET_SELECTED_DATE(state, index) {
      state.selectedDate = index;
    },
  },
});
