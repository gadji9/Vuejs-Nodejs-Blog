import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status_message: '',
    news:[]
  },
  mutations: {
    M_CHANGE_STATUS_MESSAGE(state, current_message){
      state.status_message = current_message
    },
    M_CHANGE_NEWS(state, news){
      state.news= news
    },
  },
  actions: {
    A_CHANGE_STATUS_MESSAGE({commit}, current_message){
      commit('M_CHANGE_STATUS_MESSAGE', current_message)
    },
    A_CHANGE_NEWS({commit}, news){
      commit('M_CHANGE_NEWS',news)
    }
  },
  getters: {
    STATUS_MESSAGE(state){
      return state.status_message
    },
    NEWS(state){
      return state.news
    }
  },
});
