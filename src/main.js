import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueClipboard from "vue-clipboard2";

import "@/utils/rem";

Vue.config.productionTip = false;

if (process.env.VUE_APP_CURRENTMODE !== "prod") {
  // 非生产环境
  const VConsole = require("vconsole");
  new VConsole();
} else {
  // 生产环境
  // https://42c7f33c9b1141858c929388f6b400d2@sentry.tt.cn/9
}
// 异常上报
const Sentry = require("@sentry/browser");
const Integrations = require("@sentry/integrations");
Sentry.init({
  dsn: "https://b9b1cd75d22b45d0a08f79313bd74511@sentry.io/1781233",
  integrations: [
    new Integrations.Vue({ Vue, attachProps: true, logErrors: true })
  ],
  environment: process.env.VUE_APP_CURRENTMODE
});

Vue.use(VueClipboard);
Vue.use(require("vue-wechat-title"));

Vue.prototype.$store = store;

const app = new Vue({
  components: {
    App
  },
  router,
  render: h => h(App)
});

// app.$mount("#app");

window.mountApp = () => {
  app.$mount("#app");
};
if (process.env.NODE_ENV === "development" || window.STYLE_READY) {
  window.mountApp();
}
