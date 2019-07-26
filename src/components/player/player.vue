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
        <div class="middle">
          <div class="middl-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd">
                <img v-lazy="currentSong.imgUrl" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">0:01</span>
            <div class="progress-bar-wrapper">
              <div class="progress-bar">
                <div class="bar-inner">
                  <div class="progress"></div>
                  <div class="progress-btn-wrapper">
                    <div class="progress-btn"></div>
                  </div>
                </div>
              </div>
            </div>
            <span class="time time-r">0:01</span>
          </div>
          <div class="operators">
            <i class="iconfont icon icon-suijibofang"></i>
            <i class="iconfont icon icon-shangyigeshangyiqu"></i>
            <i class="iconfont icon play icon-bofang"></i>
            <i class="iconfont icon icon-xiayigexiayiqu"></i>
            <i class="iconfont icon icon-icon-"></i>
          </div>
        </div>
        <div class="bgimg">
          <img :src="currentSong.imgUrl" alt="">
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img v-lazy="currentSong.imgUrl" class="play">
        </div>
        <div class="text">
          <h1 class="name" v-html="currentSong.name"></h1>
          <div class="desc" v-html="currentSong.artists"></div>
        </div>
        <div class="control">
          <i class="iconfont icon-bofang"></i>
        </div>
        <div class="control">
          <i class="iconfont icon-gengduo" style="font-size: 20px"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import myHeader from '../header/header'
import {mapGetters, mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import {prefixStyle} from 'common/js/dom'
const transform = prefixStyle('transform')
export default {
  components: {
    myHeader
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong'
    ])
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    enter(el, done) {
      const {x, y, scale} = this.getPosAndScale()
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
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      const wrapper = this.$refs.cdWrapper
      wrapper.style.transition = 'all 0.4s'
      const {x, y, scale} = this.getPosAndScale()
      wrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      wrapper.addEventListener('transitionend', done)
    },
    leaveEnter(){
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style.transform = ''
    },
    getPosAndScale (){
      const targetWidth = 40 // mini CD的宽度
      const paddingLeft = 40 // mini CD 到左侧的距离
      const paddingBottom = 30 // mini CD 到底部的距离
      const paddingTop = 100 // cd到顶部的距离 
      const width = window.innerWidth * 0.8 // cd大小
      const scale = targetWidth / width // 初始缩放比例
      // 大CD中心点坐标
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {x, y, scale}
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  }
}
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
      .icon
        font-size 30px
        color $color-theme
        display flex
        align-items center
        font-weight 800
      .ar
        width 100%
        position absolute
        top 50px
        text-align center
      .middle
        display: flex
        align-items: center
        position: absolute
        width: 100%
        top: 100px
        white-space: nowrap
        font-size: 0
        .middl-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
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
              img 
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%
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
          .time-r
            text-align right 
          .progress-bar-wrapper
            flex 1
            .progress-bar
              height 30px
              .bar-inner
                position relative
                top 13px
                height 4px
                background rgba(0, 0, 0, .3)
                .progress
                  position absolute
                  height 100%
                  background $color-theme
                  width 50%
                .progress-btn-wrapper
                  position absolute
                  left -8px
                  top -13px
                  width 30px
                  height 30px
                  .progress-btn
                    position: relative
                    top: 7px
                    left: 7px
                    box-sizing: border-box
                    width: 16px
                    height: 16px
                    border: 5px solid #f1f1f1
                    border-radius: 50%
                    background: $color-theme
      .bgimg
        position: absolute
        left: -50%
        top: -50%
        width: 300%
        height: 300%
        z-index: -1
        opacity: .6
        filter: blur(30px)
</style>
