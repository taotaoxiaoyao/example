import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from 'components/hello/hello'

Vue.use(VueRouter)
let routes = [{
    path: '/',
    component: Hello
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
