/**
 * Created by Administrator on 2017-04-26.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  id: 1
}
const mutations = {
  increment (state) {
    state.id++
  }
}
export default new Vuex.Store({
  state,
  mutations
})
