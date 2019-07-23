<template>
  <div class="album">
    <my-header :title="title">
      <template v-slot:left>
        <span class="icon" @click="goBack">
          <i class="cubeic-back"></i>
          <span class="text">Back</span>
        </span>
      </template>
      <template v-slot:right>
        <span class="icon right">
          <i class="cubeic-search"></i>
        </span>
      </template>
    </my-header>
    <my-list></my-list>
  </div>
</template>

<script>
import myHeader from 'components/header/header'
import myList from './components/albumList'
export default {
  data () {
    return {
      title: 'Home',
      id: 0
    }
  },
  components: {
    myHeader,
    myList
  },
  watch: {
    '$route' (to, from) {
      if(to !== from){
        this.init()
      }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    init () {
      this.title = this.$route.params.name
      this.id = this.$route.params.id
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>
  .album
    width 100%
    .right
      flex-direction row-reverse
    .icon
      font-size 20px
      display flex
      align-items center
      .text
        font-size $font-size-small
</style>
