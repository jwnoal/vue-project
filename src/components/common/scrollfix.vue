<template>
  <div class="scrollfix">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "scrollfix",
  data() {
    return {
      posY: "",
      maxscroll: "",
      scrollTop: ""
    };
  },
  created() {
    document.addEventListener("touchstart", this.eventStart, {
      passive: false
    });
    document.addEventListener("touchmove", this.eventMove, { passive: false });
  },
  destroyed() {
    document.removeEventListener("touchstart", this.eventStart, {
      passive: false
    });
    document.removeEventListener("touchmove", this.eventMove, {
      passive: false
    });
  },
  methods: {
    eventMove(e) {
      const excludeEl = document.querySelectorAll(".can-scroll");
      const isExclude = [].some.call(excludeEl, el => el.contains(e.target));
      if (isExclude) {
        let elScroll = e.target.offsetParent || e.target;
        // 当前的滚动高度
        this.scrollTop = elScroll.scrollTop;
        // 现在移动的垂直位置，用来判断是往上移动还是往下
        let events = e.touches[0] || e;
        // 移动距离
        let distanceY = events.pageY - this.posY;
        // 上下边缘检测
        if (distanceY > 0 && this.scrollTop == 0) {
          // 往上滑，并且到头
          // 禁止滚动的默认行为
          e.preventDefault();
          return;
        }
        // 下边缘检测
        if (distanceY < 0 && this.scrollTop + 1 >= this.maxscroll) {
          // 往下滑，并且到头
          // 禁止滚动的默认行为
          e.preventDefault();
          return;
        }
        return true;
      }
      e.preventDefault();
    },
    eventStart(e) {
      let elScroll = e.target.offsetParent || e.target;
      let events = e.touches[0] || e;
      this.posY = events.pageY;
      this.maxscroll = elScroll.scrollHeight - elScroll.clientHeight;
      this.scrollTop = elScroll.scrollTop;
    }
  }
};
</script>

<style lang="scss" scoped>
html {
  touch-action: none;
}
</style>
