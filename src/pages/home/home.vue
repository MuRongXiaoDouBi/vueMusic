<template>
  <div class="home">
    <my-header :title="title">
      <template v-slot:left>
        <span class="icon">
          <i class="cubeic-more"></i>
        </span>
      </template>
      <template v-slot:right>
        <span class="icon">
          <i class="cubeic-search"></i>
        </span>
      </template>
    </my-header>
    <my-swiper></my-swiper>
  </div>
</template>

<script>
import myHeader from 'components/header/header'
import mySwiper from './components/swiper'
export default {
  data () {
    return {
      title: 'Home'
    }
  },
  components: {
    myHeader,
    mySwiper
  }
}
</script>

<style lang="stylus" scoped>
  .home
    width 100%
    .icon
      font-size 24px
</style>
