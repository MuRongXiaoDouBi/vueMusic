<template>
  <div id="app">
    <keep-alive :exclude="exclude">
      <transition :name="transition">
        <router-view class="view" />
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import { watch } from "fs";
export default {
  name: "app",
  data() {
    return {
      exclude: ["Albumlist"],
      transition: "slide-left"
    };
  },
  watch: {
    $route(to, from) {
      var back = this.$router.back;
      if (back) {
        //点击了返回
        this.transition = "slide-right";
      } else {
        this.transition = "slide-left";
      }
      this.$router.back = false;
    }
  }
};
</script>

<style>
#app {
  width: 100%;
  overflow: hidden;
}
.view {
  position: absolute;
  width:100%;
  transition: all 0.3s ease;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(50px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-50px, 0);
}
/* .slide-enter-active, .slide-leave-active {
  transition: opacity .5s;
}
.slide-enter, .slide-leave-to  {
  transform: translate3d(100%, 0, 0);
} */
</style>
