import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ProductsShow from "../views/ProductsShow.vue";
import ConditionsShow from "../views/ConditionsShow";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/UsersShow.vue";
import ProductsNew from "../views/ProductsNew.vue";
import ConditionsNew from "../views/ConditionsNew.vue";
import ConditionsEdit from "../views/ConditionsEdit.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/conditions/new",
    name: "conditions-new",
    component: ConditionsNew
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow
  },
  {
    path: "/products/new",
    name: "products-new",
    component: ProductsNew
  },
  {
    path: "/products/:id",
    name: "products-show",
    component: ProductsShow
  },
  {
    path: "/conditions/:id/edit",
    name: "conditions-edit",
    component: ConditionsEdit
  },
  {
    path: "/conditions/:id",
    name: "conditions-show",
    component: ConditionsShow
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
