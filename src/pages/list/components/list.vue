<template>
  <div class="wrapper">
    <div class="list-wrapper" v-if="songs.length" ref="list">
      <cube-scroll ref="scroll" :data="songs" class="scroll-list-inner-wrap">
        <info :info="info"></info>
        <div class="list">
          <list-title title="Tracklist">
            <span @click="random">Shuffle</span>
          </list-title>
          <list-view :list="songs" @select="selectItem"></list-view>
        </div>
      </cube-scroll>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import loading from "components/loading/loading";
import listTitle from "components/listTitle/listTitle";
import listView from "components/listView/listView";
import info from "./info";
import { SongsList } from "common/js/class";
import {
  initArtists,
  dateFormat,
  timeFormat,
  getSongUrl
} from "common/js/utils";
import { mapActions } from "vuex";
import { playListMixin } from "common/js/mixin";
import { listType } from "common/js/config";
export default {
  mixins: [playListMixin],
  data() {
    return {
      songs: [],
      info: {},
      id: null,
      listType: 0
    };
  },
  watch: {
    $route(to, from) {
      if (to.params.id != from.params.id) {
        this.id = this.$route.params.id;
        if (to.params.id) {
          this.init();
        }
      }
    }
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
      });
    },
    async _getAlbumList() {
      const { songs, album } = await this.$api.list.apiAlbum({
        id: this.id
      });
      let songList = [];
      let songId = [];
      songs.map(item => {
        songId.push(item.id);
        songList.push(
          new SongsList({
            id: item.id,
            name: item.name,
            artists: initArtists(item.ar),
            imgUrl: item.al.picUrl,
            time: timeFormat(item.dt),
            dt: item.dt
          })
        );
      });
      const songsUrl = await getSongUrl(songId);
      songList.map((item, index) => {
        songsUrl.map(i => {
          if (item.id === i.id) {
            songList[index].songUrl = i.url;
          }
        });
      });
      this.songs = songList;
      let albumInfo = {
        id: album.id,
        name: album.name,
        imgUrl: album.picUrl,
        artists: initArtists(album.artist.name),
        type: album.type,
        desc: album.description,
        time: dateFormat(album.publishTime)
      };
      this.info = albumInfo;
    },
    async _getTrackList() {
      const { playlist } = await this.$api.list.apiTrackList({
        id: this.id
      });
      let tracks = playlist.tracks;
      let songList = [];
      let songId = [];
      tracks.map(item => {
        songId.push(item.id);
        songList.push(
          new SongsList({
            id: item.id,
            name: item.name,
            artists: initArtists(item.ar),
            imgUrl: item.al.picUrl,
            time: timeFormat(item.dt),
            dt: item.dt
          })
        );
      });
      const songsUrl = await getSongUrl(songId);
      songList.map((item, index) => {
        songsUrl.map(i => {
          if (item.id === i.id) {
            songList[index].songUrl = i.url;
          }
        });
      });
      this.songs = songList;
      let trackInfo = {
        id: playlist.id,
        name: playlist.name,
        imgUrl: playlist.coverImgUrl,
        artists: playlist.creator.nickname,
        desc: playlist.description,
        time: dateFormat(playlist.createTime)
      };
      this.info = trackInfo;
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    handlePlayList(list) {
      let bottom = list.length > 0 ? 75 : "";
      this.$nextTick(() => {
        const refList = this.$refs.list;
        refList.style.bottom = `${bottom}px`;
        this.$refs.scroll.refresh();
      });
    },
    init() {
      switch (this.listType) {
        case listType.album:
          this._getAlbumList();
          break;
        case listType.track:
          this._getTrackList();
          break;
        default:
          break;
      }
    },
    ...mapActions(["selectPlay", "randomPlay"])
  },
  created() {
    if (this.$route.params) {
      this.id = this.$route.params.id;
      this.listType = this.$route.params.type;
      this.init();
    }
  }
};
</script>
<style lang="stylus" scoped>
.list-wrapper
  position fixed
  top 50px
  width 100%
  bottom 0
  .scroll-list-inner-wrap
    .list
      container-padding()
</style>
