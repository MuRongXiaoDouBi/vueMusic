import {mapGetters, mapMutations} from 'vuex'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlayList(this.playlist)
  },
  activated() {
    this.handlePlayList(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlayList(newVal)
    }
  },
  methods: {
    handlePlayList() {
      throw new Error('components must implement handlePlaylist method')
    }
  }
}

export const playListPlay = {
  data() {
    return {
      songId: null,
      isPlay: true
    }
  },
  computed: {
    ...mapGetters([
      'playing',
      'playlist',
      'currentIndex'
    ])
  },
  watch:{
    currentIndex() {
      this.songId = this.playlist[this.currentIndex].id
    },
    playlist() {
      this.songId = this.playlist[this.currentIndex].id
    }
  },
  methods: {
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    selectItem (item, index) {
      this.$emit('select', item, index)
    }
  }
}