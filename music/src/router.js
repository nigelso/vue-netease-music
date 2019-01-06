import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/Home";
import User from "./views/user/User";
import Search from "./views/search/Search";
import Login from "./views/login/Login";
import SongMenu from "./views/menu/SongMenu";
import Menu from "./views/menu/components/Menu";
import Rank from "./views/rank/Rank";
import Every from "./views/home/components/Every";
import Singer from "./views/singer/Singer";
import SingerSong from "./views/singer/components/SingerSong";
import MenuType from "./views/menu/components/MenuType.vue";

Vue.use(Router);

const router = new Router({
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
      component: Home,
      children: [
        {
          path: "every",
          name: "every",
          component: Every
        }
      ]
    },
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/menu",
      name: "menu",
      redirect: "/menu/hot",
      component: SongMenu,
      children: [
        {
          path: ":type",
          name: "menutype",
          component: MenuType,
          children: [
            {
              path: ":id",
              name: "songlist",
              component: Menu
            }
          ]
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/rank",
      name: "rank",
      component: Rank
    },
    {
      path: "/singer",
      name: "singer",
      component: Singer,
      children: [
        {
          path: ":id",
          name: "singersong",
          component: SingerSong
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
