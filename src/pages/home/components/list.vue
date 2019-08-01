<template>
 <div class="wrapper">
   <div class="list-wrapper" v-if="popularList.length" ref="list">
    <cube-scroll
      ref="scroll"
      :data="playList"
      class="scroll-list-inner-wrap"
      :options="options"
    >
      <swiper :data="banners"></swiper>
      <albums-list @select="goAlbumList" :data="albums"/>
      <play-list @select="goTrackList" :data="playList"/>
      <pop-list @select="selectItem" :data="popularList" />
    </cube-scroll>
   </div>
    <loading v-else></loading>
 </div>
</template>

<script>
import albumsList from './albumsList'
import playList from './playList'
import swiper from './swiper'
import popList from './popularList'
import loading from 'components/loading/loading'
import {initArtists, timeFormat, getSongUrl} from 'common/js/utils'
import {Albums, SongsList} from 'common/js/class'
import {playListMixin} from 'common/js/mixin'
import { mapActions } from 'vuex'
import {listType} from 'common/js/config'

export default {
  mixins:[playListMixin],
  data () {
    return {
      banners: [],
      playList: [],
      albums: [],
      popularList: [],
      options: {
        click: false
      }
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
      let songId = []
      result.map(item => {
        songId.push(item.id)
        items.push(new SongsList({
          id: item.id,
          name: item.name,
          artists: initArtists(item.song.artists),
          imgUrl: item.song.album.picUrl,
          subType: item.song.album.subType,
          time: timeFormat(item.song.duration),
          dt: item.song.duration
        }))
      })
      const songsUrl = await getSongUrl(songId)
      items.map((item, index) => {
        songsUrl.map(i => {
          if (item.id === i.id) {
            items[index].songUrl = i.url
          }
        })
      })
      this.popularList = items
    },
    handlePlayList(list) {
      let bottom = list.length > 0 ? 75 : ''
      setTimeout(() => {
        const refList = this.$refs.list
        refList.style.bottom = `${bottom}px`
        this.$refs.scroll.refresh()
      }, 500)
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.popularList,
        index
      })
    },
    goAlbumList(id) {
      this.$router.push({
        name: 'Albumlist',
        params: {
          id,
          type: listType.album
        }
      })
    },
    goTrackList(id) {
      this.$router.push({
        name: 'Tracklist',
        params: {
          id,
          type: listType.track
        }
      })
    },
    ...mapActions([
      'selectPlay'
    ])
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
.list-wrapper
  position fixed
  top 50px
  width 100%
  bottom 0
</style>
