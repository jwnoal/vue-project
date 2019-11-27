import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/wallet"
    }
    // {
    //   path: "/wallet",
    //   name: "wallet",
    //   component: wallet,
    //   meta: {
    //     title: "我的钱包"
    //   }
    // }
  ]
});
