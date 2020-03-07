<template>
  <div class="player" v-show="playlist.length">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="leaveEnter"
    >
      <div class="normal" v-show="fullScreen">
        <div class="top">
          <my-header :title="currentSong.name">
            <template v-slot:left>
              <span class="icon" @click="back">
                <i class="cubeic-select"></i>
              </span>
            </template>
          </my-header>
          <div class="ar" v-html="currentSong.artists"></div>
        </div>
        <div class="middle" @click="changeMiddle">
          <transition name="middleL">
            <div class="middl-l" v-show="currentShow === 'cd'">
              <div class="cd-wrapper" ref="cdWrapper">
                <div class="cd" :class="cdCss">
                  <img v-lazy="currentSong.imgUrl" alt="" />
                </div>
              </div>
              <div class="playing-lyric-wrapper">
                <div class="playing-lyric">{{ playingLyric }}</div>
              </div>
            </div>
          </transition>
          <transition name="middleR">
            <cube-scroll
              class="middle-r"
              ref="lyricList"
              v-show="currentShow === 'lyric'"
              :data="currentLyric && currentLyric.lines"
            >
              <div class="lyric-wrapper">
                <div v-if="currentLyric">
                  <p
                    ref="lyricLine"
                    class="text"
                    :class="{ current: currentLineNum === index }"
                    v-for="(line, index) in currentLyric.lines"
                    :key="index"
                  >
                    {{ line.txt }}
                  </p>
                </div>
              </div>
            </cube-scroll>
          </transition>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{ songTimeFormat(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                :percent="percent"
                @percentChange="percentChange"
              ></progress-bar>
            </div>
            <span class="time time-r">{{ currentSong.time }}</span>
          </div>
          <div class="operators">
            <span class="mode" v-text="modePlay" @click="changeMode"></span>
            <i
              class="iconfont icon icon-shangyigeshangyiqu"
              :class="disableClass"
              @click="prev"
            ></i>
            <i
              class="iconfont icon play"
              :class="plaIcon"
              @click="togglePlaying"
            ></i>
            <i
              class="iconfont icon icon-xiayigexiayiqu"
              @click="next"
              :class="disableClass"
            ></i>
            <i class="iconfont icon icon-icon-"></i>
          </div>
        </div>
        <div class="bgimg">
          <img :src="currentSong.imgUrl" />
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img v-lazy="currentSong.imgUrl" :class="cdCss" class="play" />
        </div>
        <div class="text">
          <h1 class="name" v-html="currentSong.name"></h1>
          <div class="desc" v-html="currentSong.artists"></div>
        </div>
        <div class="control">
          <i class="iconfont" :class="plaIcon" @click.stop="togglePlaying"></i>
        </div>
        <div class="control">
          <i class="iconfont icon-gengduo" style="font-size: 20px"></i>
        </div>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.songUrl"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import myHeader from "../header/header";
import { mapGetters, mapMutations } from "vuex";
import animations from "create-keyframe-animation";
import Lyric from "lyric-parser";
import { prefixStyle } from "common/js/dom";
import progressBar from "../progress/progress";
import { playMode } from "common/js/config";
import { shuffle } from "common/js/utils";
const transform = prefixStyle("transform");
export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      playingLyric: ""
    };
  },
  components: {
    myHeader,
    progressBar
  },
  computed: {
    plaIcon() {
      return this.playing ? "icon-suspend_icon" : "icon-bofang";
    },
    cdCss() {
      return this.playing ? "play" : "play pause";
    },
    disableClass() {
      return this.songReady ? "" : "disable";
    },
    percent() {
      return this.currentTime / this.currentSong.dt;
    },
    modePlay() {
      return this.mode === playMode.sequence
        ? "列"
        : this.mode === playMode.loop
        ? "单"
        : "随";
    },
    ...mapGetters([
      "fullScreen",
      "playlist",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList"
    ])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong === oldSong) {
        return;
      }
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
      setTimeout(() => {
        this.$refs.audio.play();
        this.getLyric();
      }, 1000);
    },
    playing(newPlay) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlay ? audio.play() : audio.pause();
      });
    }
  },
  methods: {
    changeMiddle() {
      if (this.currentShow === "cd") {
        this.currentShow = "lyric";
      } else {
        this.currentShow = "cd";
      }
      // console.log(this.currentShow)
    },
    async getLyric() {
      const data = await this.currentSong.getLyric();
      if (this.currentSong.lyric !== data) {
        return;
      }
      let lyric = new Lyric(data, this.hanlderLyric);
      this.currentLyric = lyric;
      if (this.playing) {
        this.currentLyric.play();
      }
    },
    hanlderLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
    },
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    percentChange(percent) {
      let currentTime = this.currentSong.dt * percent;
      this.$refs.audio.currentTime = currentTime / 1000;
      if (!this.playing) {
        this.togglePlaying();
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime);
      }
    },
    updateTime(e) {
      const time = e.target.currentTime;
      this.currentTime = time;
    },
    songTimeFormat(time) {
      time = time | 0;
      const min = this.pad((time / 60) | 0);
      const second = this.pad(time % 60);
      return `${min}:${second}`;
    },
    pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      if (this.currentLyric) {
        this.currentLyric.seek();
      }
    },
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playlist.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.setPlayingState(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    enter(el, done) {
      const { x, y, scale } = this.getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      };
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear"
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper.style.animation = "";
    },
    leave(el, done) {
      const wrapper = this.$refs.cdWrapper;
      wrapper.style.transition = "all 0.4s";
      const { x, y, scale } = this.getPosAndScale();
      wrapper.style[
        transform
      ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      wrapper.addEventListener("transitionend", done);
    },
    leaveEnter() {
      this.$refs.cdWrapper.style.transition = "";
      this.$refs.cdWrapper.style.transform = "";
    },
    getPosAndScale() {
      const targetWidth = 40; // mini CD的宽度
      const paddingLeft = 40; // mini CD 到左侧的距离
      const paddingBottom = 30; // mini CD 到底部的距离
      const paddingTop = 100; // cd到顶部的距离
      const width = window.innerWidth * 0.8; // cd大小
      const scale = targetWidth / width; // 初始缩放比例
      // 大CD中心点坐标
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return { x, y, scale };
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayMode: "SET_PLAY_MODE",
      setPlayList: "SET_PLAYLIST"
    })
  }
};
</script>

<style lang="stylus" scoped>
.player
  .normal-enter-active, .normal-leave-active
    transition all .4s
    .top, .bottom
      transition all .4s cubic-bezier(.86, .18, .82, 1.32)
  .normal-enter, .normal-leave-to
    opacity 0
    .top
      transform translate3d(0, -100px, 0)
    .bottom
      transform translate3d(0, 100px, 0)
  .mini-player
    display: flex
    -ms-flex-align: center
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
    background: $color-highlight-background
    .icon
      flex 0 0 40px
      width 40px
      padding 0 10px 0 20px
      .play
        border-radius 50%
        width 100%
        &.play
          animation rotate 20s linear infinite
        &.pause
          animation-play-state paused
    .text
      display flex
      flex-direction column
      justify-content center
      flex 1
      overflow hidden
      .name
        margin-bottom: 2px
        line-height: 20px
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
        font-size: $font-size-small
        color: $color-text
      .desc
        no-wrap()
        font-size $font-size-small-s
        color $color-text-d
    .control
      flex 0 0 30px
      width 30px
      padding 0 10px
      .iconfont
        font-size 25px
        color $color-theme
        font-weight 600
  .normal
    position fixed
    top 0
    left 0
    height 100%
    width 100%
    background: $color-background
    .mode
      display flex
      align-items center
      justify-content center
      box-sizing border-box
      font-size $font-size-small-s
      color $color-theme
      border-radius 50%
      width 25px
      height 25px
      border 2px solid $color-theme
    .icon
      font-size 30px
      color $color-theme
      display flex
      align-items center
      font-weight 800
      &.disable
        color: $color-theme-d
    .ar
      width 100%
      position absolute
      top 50px
      text-align center
    .middle
      position: fixed
      width: 100%
      top: 80px
      bottom: 170px
      white-space: nowrap
      font-size: 0
      .middl-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        &.middleL-enter-active, &.middleL-leave-active
          transition: all 0.3s
        &.middleL-enter, &.middleL-leave-to
          opacity: 0
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cd
            width: 100%
            height: 100%
            box-sizing: border-box
            border: 15px solid hsla(0,0%,100%,.1)
            border-radius: 50%
            box-shadow:0 0 50px rgba(255, 255, 255, 0.3);
            &.play
              animation rotate 20s linear infinite
            &.pause
              animation-play-state paused
            img
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              border-radius: 50%
        .playing-lyric-wrapper
          width: 80%
          margin: 30px auto 0 auto
          overflow: hidden
          text-align: center
          .playing-lyric
            height: 20px
            line-height: 20px
            font-size: $font-size-medium
            color: $color-text-l
      .middle-r
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        &.middleR-enter-active, &.middleR-leave-active
          transition: all 0.2s;
        &.middleR-enter, &.middleR-leave-to
          opacity: 0
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-text-l
            font-size: $font-size-medium
            &.current
              color: $color-text
    .bottom
      position: absolute
      bottom: 50px
      width: 100%
      .operators
        width 80%
        margin 0 auto
        display flex
        align-items center
        justify-content space-between
        .icon
          font-size 30px
        .play
          font-size 40px
      .progress-wrapper
        display flex
        align-items center
        width 80%
        margin 0 auto
        padding 10px 0
        .time
          color #f1f1f1
          font-size 11px
          flex 0 0 30px
          line-height 30px
          width 30px
        .time-l
          text-align left
          padding-right 10px
        .time-r
          text-align right
          padding-left 10px
        .progress-bar-wrapper
          flex 1
    .bgimg
      position: absolute
      left: -50%
      top: -50%
      width: 300%
      height: 300%
      z-index: -1
      opacity: .6
      filter: blur(30px)
      img
        width 100%
        height 100%
@keyframes rotate
  0%
    transform rotate(0)
  100%
    transform rotate(360deg)
</style>
