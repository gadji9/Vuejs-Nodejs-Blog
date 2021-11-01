import Vue from "vue";
import VueRouter, { RouteConfig} from "vue-router";
import Home from "../views/Home.vue";
import registration from '../views/Registration.vue'
import Auth from "../views/Auth.vue"
import FindByIdForm from '../components/FindByIdForm.vue'
import ShareForm from '../components/ShareForm.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children:[
      {
        path: '/',
        component: ShareForm,

      },
      {
        path: 'find',
        component: FindByIdForm,
      }
    ],
    meta:{Auth:true}
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: registration,
  },
  {
    path: "/auth",
    component: Auth,
    name: "Auth",
  }
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
 if(to.matched.some(record=> record.meta.Auth)){
   if(!localStorage.getItem('token')){
    next({
      path: '/register'
    })
    
   }else{
    next()
  }
 }else if(to.matched.some(record=> record.name == "Auth" || record.name == "Register")){
  if(localStorage.getItem('token')){
    next({
      path: '/'
    })
  }else{
    next()
  }
 }
 else{
   next()
 }
})

export default router;
