import Vue from "vue";
import Vuex from "vuex";
import axios from './http'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        showTop: true,
        user: null,
        token: localStorage.getItem("v-token") || null
    },
    mutations: {
        SHOW_TOP: (state, show) => {
            state.showTop = show;
        },
        SET_TOKEN: (state, data) => state.token = data,
        SET_USER: (state, data) => state.user = data
    },
    actions: {
        GETUSER({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/api/front-end/user').then(res => {
                    if (res.code === 200) {
                        commit('SET_USER', res.data)
                        resolve()
                    } else {
                        reject('err')
                    }
                })
            })
        }
    }
});