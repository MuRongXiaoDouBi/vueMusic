<template>
  <div class="play">
    <div class="container">
      <list-title title="Most Played Tracks">
        <span>See All</span>
      </list-title>
      <div class="list">
        <div class="item" v-for="item in data" @click="goList(item.id)" :key="item.id">
          <img v-lazy="item.picUrl" class="img">
          <div class="main">
            <div class="title">{{item.name}}</div>
            <div class="desc">{{item.copywriter}}</div>
          </div>
          <span class="iconfont icon-xunhuanbofang"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import listTitle from 'components/listTitle/listTitle'
export default {
  props: {
    data: {
      type: Array
    }
  },
  components: {
    listTitle
  },
  methods: {
    goList(id) {
      this.$emit('select', id)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .play
    padding-bottom 12px
    box-sizing border-box
    border-bottom $border-default-1
    .container
      container-padding()
      .list
        width 100%
        .item:first-child
          border-top $border-default-1
        .item:last-child
          border 0
        .item
          height 60px
          box-sizing border-box
          display flex
          justify-content space-between
          align-items center
          border-bottom $border-default-1
          .img
            width 40px
            height 40px
            border-radius 4px
          .main
            width 65%
            .title
              width 100%
              color $color-text
              font-size $font-size-small
              margin-bottom 8px
              no-wrap()
            .desc
              width 100%
              color $color-text-d
              font-size $font-size-small-s
              no-wrap()
          .iconfont
            font-size 25px
            color $color-theme
            margin-right 5px
</style>

<style scoped>
  /* .cube-scroll-content{
    width: 100%
  } */
</style>
