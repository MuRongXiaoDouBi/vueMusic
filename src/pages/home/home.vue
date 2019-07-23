<template>
  <div class="home">
    <my-header :title="title">
      <template v-slot:left>
        <span class="icon">
          <i class="cubeic-more"></i>
        </span>
      </template>
      <template v-slot:right>
        <router-link to="/albumlist">
          <span class="icon right">
            <i class="cubeic-search"></i>
          </span>
        </router-link>
      </template>
    </my-header>
    <my-list></my-list>
  </div>
</template>

<script>
import myHeader from 'components/header/header'
import myList from './components/list'
export default {
  data () {
    return {
      title: 'Home'
    }
  },
  components: {
    myHeader,
    myList
  }
}
</script>

<style lang="stylus" scoped>
  .home
    width 100%
    .right
      flex-direction row-reverse
    .icon
      font-size 20px
      color $color-theme
      display flex
      align-items center
</style>
