<template>
  <div class="swiper">
    <cube-slide ref="slide" :data="data" @change="changePage" :showDots="false">
      <cube-slide-item
        v-for="item in data"
        :key="item.targetId"
        class="swiper-item"
      >
        <img class="swiper-img" :src="item.imageUrl" />
      </cube-slide-item>
  </cube-slide>
  <div class="my-dots">
    <span class="dots-item" :class="{active: currentIndex === index}" v-for="(item, index) in data.length" :key="index"></span>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      banners:[],
      currentIndex: 0
    };
  },
  methods: {
    changePage(current) {
      this.currentIndex = current
    }
  }
};
</script>

<style lang="stylus" scoped>
.swiper
  position relative
  overflow hidden
  width 100%
  height 0
  padding-bottom 37.06%
  .cube-slide
    position absolute
    width 100%
    img 
      width 100%
  .my-dots
    position absolute
    width 100%
    bottom 22px
    display flex
    justify-content center
    border 0
    .dots-item
      background rgba(255,255,255,.2)
      width 6px
      height 6px
      border-radius 50%
      margin-right 10px
    .dots-item:last-child
      margin-right 0
    .active
      background #fff
</style>
