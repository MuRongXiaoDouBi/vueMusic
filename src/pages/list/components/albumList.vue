<template>
 <div class="wrapper">
    <cube-scroll
      ref="list"
      :data="songs"
      class="scroll-list-inner-wrap"
      v-if="songs.length"
    >
      <info :info="album"></info>
      <div class="list">
        <list-title title="Tracklist">
          <span @click="random">Shuffle</span>
        </list-title>
        <list-view :list="songs" @select="selectItem"></list-view>
      </div>
    </cube-scroll>
    <loading v-else></loading>
 </div>
</template>

<script>
import loading from 'components/loading/loading'
import listTitle from 'components/listTitle/listTitle'
import listView from 'components/listView/listView'
import info from './info'
import {songsList} from 'common/js/class'
import {initArtists, dateFormat, timeFormat, getSongUrl} from 'common/js/utils'
import {mapActions} from 'vuex'
import {playListMixin} from 'common/js/mixin'
export default {
  mixins:[playListMixin],
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
    listTitle,
    listView
  },
  methods: {
    random() {
      this.randomPlay({
        list: this.songs
      })
    },
    async _getAlbumList (id) {
      const {songs, album} = await this.$api.list.apiAlbum({
        id
      })
      let songList = []
      let songId = []
      songs.map(item => {
        songId.push(item.id)
        songList.push(new songsList({
          id: item.id,
          name: item.name,
          artists: initArtists(item.ar),
          imgUrl: item.al.picUrl,
          time: timeFormat(item.dt),
          dt: item.dt
        }))
      })
      const songsUrl = await getSongUrl(songId)
      songList.map((item, index) => {
        songsUrl.map(i => {
          if (item.id === i.id) {
            songList[index].songUrl = i.url
          }
        })
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
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    handlePlayList(list) {
      const bottom = list.length > 0 ? 60 : ''
      bottom = bottom + 50
      setTimeout(() => {
        // const refList = this.$refs.list
        // refList.$el.style.height = `calc(100% - ${bottom}px)`
        // console.log(refList.$el.style)
        // refList.refresh()
      }, 500)
      // this.$refs.list.$el.style.bottom = bottom
      // 
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
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
  width 100%
  height calc(100% - 50px)
  .list
    container-padding()
</style>
