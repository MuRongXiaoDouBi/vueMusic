<template>
  <div class="list-view">
    <div class="item" v-for="(item, index) in list" :key="item.id" @click="selectItem(item, index)">
      <div class="number">{{index + 1}}</div>
      <img v-lazy="item.imgUrl" class="img" v-if="item.imgUrl">
      <div class="main">
        <div class="name">{{item.name}}</div>
        <div class="ar">{{item.artists}}</div>
      </div>
      <div class="time">{{item.time}}</div>
      <div class="play iconfont icon-bofang"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    selectItem (item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list-view
    .item:first-child
      border-top $border-default-1
    .item
      display flex
      align-items center
      justify-content space-between
      padding 0 10px
      height 60px
      box-sizing border-box
      border-bottom $border-default-1
      .number
        font-size $font-size-small
        color $color-text-d
      .img
        height 44px
        width 44px
        border-radius 4px
      .main
        .name, .ar
          no-wrap()
          width 120px
        .name
          font-size $font-size-small
          margin-bottom 9px
        .ar
          font-size $font-size-small-s
          color $color-text-d
      .time
        width 45px
        color $color-text-d
        font-size $font-size-small
      .play
        color $color-theme
        font-weight 600
        font-size 20px
</style>
