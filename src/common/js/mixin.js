import {mapGetters} from 'vuex'
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