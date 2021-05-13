import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import ShowDevices from "../views/ShowDevices.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/show-devices",
    name: "ShowDevices",
    component: ShowDevices,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
