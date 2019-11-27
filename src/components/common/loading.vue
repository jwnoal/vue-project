<template>
  <transition name="fade">
    <div class="loading" v-if="$store.state.loading">
      <div class="contain">
        <img class="center" src="../../assets/loading.gif" alt="loading" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "loading",
  props: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loading {
  position: fixed;
  z-index: 2000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .contain {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    border-radius: 0.16rem;
    // background: #fff;
    img {
      width: 0.88rem;
      display: block;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@keyframes weuiLoading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>
