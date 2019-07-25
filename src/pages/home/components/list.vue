<template>
 <div class="wrapper">
    <cube-scroll
      ref="scroll2"
      :data="playList"
      class="scroll-list-inner-wrap"
      v-if="popularList.length"
    >
      <swiper :data="banners"></swiper>
      <albums-list :data="albums"/>
      <play-list :data="playList"/>
      <pop-list :data="popularList" />
    </cube-scroll>
    <loading v-else></loading>
 </div>
</template>

<script>
import albumsList from './albumsList'
import playList from './playList'
import swiper from './swiper'
import popList from './popularList'
import loading from 'components/loading/loading'
import {initArtists} from 'common/js/utils'
import {Albums, NewSongs} from 'common/js/class'

export default {
  data () {
    return {
      banners: [],
      playList: [],
      albums: [],
      popularList: []
    }
  },
  components: {
    albumsList,
    playList,
    swiper,
    loading,
    popList
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
          artists: initArtists(item.artists)
        }))
      })
      this.albums = items
    },
    async _getPlayList () {
      const {result} = await this.$api.home.apiPlaylist({
        limit: 5
      })
      this.playList = result
    },
    async _getNewSongs () {
      const {result} = await this.$api.home.apiNewSongs()
      let items = []
      result.map(item => {
        items.push(new NewSongs({
          id: item.song.id,
          name: item.song.name,
          imgUrl: item.song.album.picUrl,
          artists: initArtists(item.song.artists),
          subType: item.song.album.subType
        }))
      })
      this.popularList = items
    }
  },
  created () {
    this._getBanner()
    this._getNewAlbum()
    this._getPlayList()
    this._getNewSongs()
  }
}
</script>
<style lang="stylus" scoped>
.scroll-list-inner-wrap
  position fixed
  top 50px
  bottom 0
  width 100%
  height calc(100% - 80px)
</style>
