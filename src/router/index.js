import Vue from 'vue'
import VueRouter from 'vue-router'
import Artists from "@/views/Artists";
import Records from "@/views/Records";
import Signin from "@/views/Signin";
import Signup from "@/views/Signup";
import Admin from "@/views/Admin";
import Welcome from "@/views/Welcome";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists
  },
  {
    path: '/records',
    name: 'Records',
    component: Records
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
