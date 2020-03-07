/*
 * @Author: MuRong
 * @Date: 2020-03-07 17:21:59
 * @LastEditors: MuRong
 * @LastEditTime: 2020-03-07 18:14:59
 * @Description:
 * @FilePath: \vueMusic-master\src\common\js\mixin.js
 */
import { mapGetters, mapMutations } from "vuex";
export const playListMixin = {
  computed: {
    ...mapGetters(["playlist"])
  },
  watch: {
    playlist(newVal) {
      this.handlePlayList(newVal);
    }
  },
  methods: {
    handlePlayList() {
      throw new Error("components must implement handlePlaylist method");
    }
  }
};

export const playListPlay = {
  data() {
    return {
      songId: null,
      isPlay: true
    };
  },
  computed: {
    ...mapGetters(["playing", "playlist", "currentIndex"])
  },
  watch: {
    currentIndex() {
      this.songId = this.playlist[this.currentIndex].id;
    },
    playlist() {
      this.songId = this.playlist[this.currentIndex].id;
    }
  },
  methods: {
    ...mapMutations({
      setPlayingState: "SET_PLAYING_STATE"
    }),
    selectItem(item, index) {
      this.$emit("select", item, index);
    }
  }
};
