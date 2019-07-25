<template>
 <div class="wrapper">
    <cube-scroll
      ref="scroll2"
      :data="songs"
      class="scroll-list-inner-wrap"
      v-if="Object.keys(album).length"
    >
      <info :info="album"></info>
      <list :list="songs"></list>
    </cube-scroll>
    <loading v-else></loading>
 </div>
</template>

<script>
import loading from 'components/loading/loading'
import list from './list'
import info from './info'
import {NewSongs} from 'common/js/class'
import {initArtists, dateFormat, timeFormat} from 'common/js/utils'
export default {
  data () {
    return {
      songs: [],
      album: {},
      albumId: null
    }
  },
  watch: {
  },
  components: {
    loading,
    info,
    list
  },
  methods: {
    async _getAlbumList (id) {
      const {songs, album} = await this.$api.list.apiAlbum({
        id
      })
      let songList = []
      songs.map(item => {
        songList.push(new NewSongs({
          id: item.id,
          name: item.name,
          artists: initArtists(item.ar),
          imgUrl: item.al.picUrl,
          time: timeFormat(item.dt)
        }))
      })
      this.songs = songList
      let albumList = {
          id:album.id,
          name: album.name,
          imgUrl: album.picUrl,
          artists: initArtists(album.artist.name),
          type: album.type,
          desc: album.description,
          time: dateFormat(album.publishTime)
      }
      this.album = albumList
    }
  },
  mounted () {
    this.albumId = this.$route.params.id
    this._getAlbumList(this.albumId)
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
