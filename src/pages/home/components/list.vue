<template>
 <div class="wrapper">
    <cube-scroll
      ref="scroll2"
      :data="playList"
      class="scroll-list-inner-wrap"
    >
      <swiper :data="banners"></swiper>
      <albums-list :data="albums"/>
      <play-list :data="playList"/>
    </cube-scroll>
 </div>
</template>

<script>
import albumsList from './albumsList'
import playList from './playList'
import swiper from './swiper'

import Albums from 'common/js/class'

export default {
  data () {
    return {
      banners: [],
      playList: [],
      albums: []
    }
  },
  components: {
    albumsList,
    playList,
    swiper
  },
  methods: {
    async _getBanner () {
      const {banners} = await this.$api.home.apiBanner()
      banners.map(item => {
        if(item.targetId) {
          this.banners.push(item)
        }
      })
    },
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
    async _getPlayList () {
      const {result} = await this.$api.home.apiPlaylist()
      this.playList = result
    }
  },
  created () {
    this._getBanner()
    this._getNewAlbum()
    this._getPlayList()
  }
}
</script>
<style lang="stylus" scoped>
.scroll-list-inner-wrap
  position fixed
  top 50px
  bottom 0
  width 100%
  height 100%
</style>
