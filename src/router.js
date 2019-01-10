import Vue from "vue";
import Router from "vue-router";
import Recommend from "components/recommend/Recommend";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      name: "recommend",
      component: Recommend
    }
  ]
});
