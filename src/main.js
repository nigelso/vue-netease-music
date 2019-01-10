import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fastClick from "fastclick";
import VueLazyload from "vue-lazyload";
import "common/stylus/reset.styl";

fastClick.attach(document.body);
Vue.use(VueLazyload, {
  preload: 1.3
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
