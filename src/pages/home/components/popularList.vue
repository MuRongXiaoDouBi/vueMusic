<template>
  <div class="popular">
    <div class="container">
      <list-title title="Popular Music">
        <span>See All</span>
      </list-title>
      <cube-scroll
        ref="scroll"
        :data="data"
        direction="horizontal"
        nest-mode="native"
        class="list">
        <div class="list-wrapper">
          <div class="item" v-for="item in data" :key="item.id">
            <span class="img">
              <img v-lazy="item.imgUrl" alt="" class="img">
              <span class="img-bottom">
                <span class="subtype">{{item.subType}}</span>
                <i class="play iconfont icon-bofang"></i>
              </span>
            </span>
            <span class="title">{{item.name}}</span>
            <span class="desc">{{item.artists}}</span>
          </div>
        </div>
      </cube-scroll>
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
  }
}
</script>

<style lang="stylus" scoped>
  .popular
    padding-bottom 12px
    box-sizing border-box
    border-bottom $border-default-1
    .container
      container-padding()
      .list
        width 100%
        .list-wrapper
          height 150px
          display flex
          flex-wrap nowrap
          .item:last-child
            margin-right 0
          .item
            height 100%
            width 100px
            float left
            display flex
            flex-direction column
            justify-content space-between
            margin-right 14px
            .img
              position relative
              width 100px
              height 100px
              background #fff
              border-radius 4px
              .img-bottom
                position absolute
                bottom 0
                left 0
                width 100%
                height 20px
                line-height 20px
                background rgba(0,0,0,.5)
                z-index 9999
                .subtype
                  position absolute
                  left 5px
                  font-size $font-size-small-s
                  color $color-text-d
                .play
                  position absolute
                  right 5px
                  font-weight 600
                  font-size 15px
                  opacity .7
            .title
              font-size $font-size-small
              color $color-text
              no-wrap()
            .desc
              font-size $font-size-small-s 
              color $color-text-d
              no-wrap()
</style>

<style>
.popular .list .cube-scroll-content {display: inline-block}
</style>
