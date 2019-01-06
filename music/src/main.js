import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import fastClick from "fastclick";
import VueLazyload from "vue-lazyload";
import "element-ui/lib/theme-chalk/index.css";

import "style/reset.css";
import "style/iconfont.css";
import "style/border.css";
import "style/mixin.styl";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require("assets/img/preload.png"),
  attempt: 1
});

Vue.config.productionTip = false;
fastClick.attach(document.body);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
