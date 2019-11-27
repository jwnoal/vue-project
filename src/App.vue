<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" />
    <loading></loading>
  </div>
</template>

<script>
// @ is an alias to /src
import "normalize.css";
import api from "@/api";
import loading from "@/components/common/loading.vue";
export default {
  components: {
    loading
  },
  created() {
    console.log(api.name);
    console.log(process.env.VUE_APP_CURRENTMODE);
  }
};
</script>

<style lang="scss">
@import "./style/util.scss";
html,
body {
  height: 100%;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-overflow-scrolling: touch;
}
body {
  font-size: 0.32rem;
  color: #666;
  font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
}
a,
img {
  -webkit-touch-callout: none; /* 禁止长按链接与图片弹出菜单 */
  -webkit-tap-highlight-color: transparent;
}
input:focus {
  -webkit-tap-highlight-color: transparent;
  outline: none;
}
p {
  margin-block-start: 0;
  margin-block-end: 0;
}
i {
  font-style: normal;
}
#app {
  max-width: 750px;
  margin: auto;
  height: 100%;
}
div,
span,
p {
  word-break: break-all;
  word-wrap: break-word;
}
input {
  border: 0;
  box-sizing: border-box;
}
input::-webkit-input-placeholder {
  color: #d0d0d0;
}

textarea::-webkit-input-placeholder {
  color: #d0d0d0;
}
</style>
