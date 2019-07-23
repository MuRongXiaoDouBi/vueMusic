<template>
  <div class="albums">
    <div class="container">
      <list-title title="New Albums">
        <span>See All</span>
      </list-title>
      <cube-scroll
        ref="scroll"
        :data="albums"
        direction="horizontal"
        class="list">
        <div class="list-wrapper">
          <div class="item" v-for="item in albums" :key="item.id">
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
import Albums from 'common/js/class'
export default {
  data () {
    return {
      items: [1,2],
      albums: []
    }
  },
  components: {
    listTitle
  },
  methods: {
    async _getNewAlbum () {
      const {albums} = await this.$api.home.apiNewAlbum()
      let items = []
      albums.map(item => {
        items.push(new Albums({
          id: item.id,
          name: item.name,
          imgUrl: item.picUrl,
          artists: Albums.initArtists(item.artists)
        }))
      })
      this.albums = items
    },
    
  },
  created () {
    this._getNewAlbum()
  }
}
</script>

<style lang="stylus" scoped>
  
  .albums
    padding-bottom 12px
    box-sizing border-box
    border-default-1px()
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
.cube-scroll-content{
  display: inline-block
}
</style>
