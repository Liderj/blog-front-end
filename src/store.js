import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    showTop: true
  },
  mutations: {
    SHOW_TOP: (state, show) => {
      state.showTop = show;
    }
  },
  actions: {}
});
