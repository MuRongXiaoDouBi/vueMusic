<template>
  <div class="albums">
    <div class="container">
      <list-title title="New Albums">
        <span>See All</span>
      </list-title>
      <cube-scroll
        ref="scroll"
        :data="data"
        direction="horizontal"
        nest-mode="native"
        class="list"
        :options="options"
      >
        <div class="list-wrapper" >
          <div class="item" v-for="item in data" :key="item.id" @click.stop="goList(item.id)">
            <img v-lazy="item.imgUrl" alt="" class="img">
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
  data () {
    return {
      options: {
        click: false
      }
    }
  },
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
  .albums
    padding-bottom 12px
    box-sizing border-box
    border-bottom $border-default-1
    .container
      container-padding()
      .list
        width 100%
        .list-wrapper
          height 174px
          display flex
          flex-wrap nowrap
          .item:last-child
            margin-right 0
          .item
            height 100%
            width 125px
            float left
            display flex
            flex-direction column
            justify-content space-between
            margin-right 14px
            .img
              width 125px
              height 125px
              background #fff
              border-radius 4px
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
.albums .list .cube-scroll-content {display: inline-block}
</style>
