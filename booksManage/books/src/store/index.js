import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    studentinfo: {},
  },
  mutations: {
    addStudent(state, student) {
      state.studentinfo = student;
    },
    delStudent(state) {
      state.studentinfo = {}
    }
  }
})
