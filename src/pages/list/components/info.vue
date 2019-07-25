<template>
  <div class="info">
    <div class="container">
      <div class="img">
        <img v-lazy="info.imgUrl">
        <span class="type">
          {{info.type}}
        </span>
      </div>
      <div class="container-info">
        <div class="title">{{info.name}}</div>
        <div class="info-desc" v-html="info.desc"></div>
        <div class="info-main">
          <div class="desc">
            <div class="name">{{info.artists}}</div>
            <div class="time">{{info.time}}</div>
          </div>
          <!-- <span class="iconfont icon-xunhuanbofang"></span> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
    }
  }
}
</script>


<style lang="stylus" scoped>
  .info
    container-padding()
    margin-top 15px
    width 100%
    .container
      width 100%
      height 125px
      display flex
      .img
        position relative
        width 120px
        height 120px
        margin-right 17px
        .type
          position absolute
          display flex
          align-items center
          font-size 10px
          left 0
          top 10px
          padding 0 2px
          height: 0
          border: 8px solid $color-theme;
          border-left : 0 solid;
          border-right: 10px solid rgba(0,0,0,0)
        img 
          width 120px
          height 120px
          border-radius 4px
      .container-info
        display flex
        flex-direction column
        justify-content space-between
        .info-desc
          font-size $font-size-small-s
          color $color-text-d
          line-height 15px
          no-line-wrap(2)
        .title
          font-size $font-size-large
          line-height 28px
          no-line-wrap(2)
        .info-main
          height 37px
          display flex
          align-items center
          justify-content space-between
          .desc
            height 100%
            width 133px
            .name
              margin-bottom 7px
              font-size $font-size-small
              color $color-text
              no-wrap()
            .time
              font-size $font-size-small-s
              color $color-text-d
              no-wrap()
          .iconfont
            font-size 30px
            color $color-theme
</style>
