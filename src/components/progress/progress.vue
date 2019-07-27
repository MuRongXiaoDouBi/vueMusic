<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div 
        class="progress-btn-wrapper" 
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if(!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(
          this.$refs.progressBar.clientWidth - progressBtnWidth,  
          Math.max(0, this.touch.left + deltaX)
      )
      this.offset(offsetWidth)
    },
    progressTouchEnd() {
      this.touch.initiated = false
      this.triggerPercent()
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this.offset(offsetWidth)
      // 当点击按钮的时候，offsetX获取不正确
      // this.offset(e.offsetX)
      this.triggerPercent()
    },
    offset(offsetWidth) {
      this.$refs.progressBtn.style.left = `calc(${offsetWidth}px - ${progressBtnWidth}px)`
      this.$refs.progress.style.width = `${offsetWidth}px`
    },
    triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    }
  },
  watch: {
    percent(newVal) {
      this.$nextTick(() => {
        if(newVal >= 0 && !this.touch.initiated) {
          let width = newVal * 100000
          this.$refs.progressBtn.style.left = `calc(${width}% - ${progressBtnWidth}px)`
          this.$refs.progress.style.width = `${width}%`
        }
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
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
      width 0
    .progress-btn-wrapper
      position absolute
      left 0
      top -13px
      width 30px
      height 30px
      .progress-btn
        position: relative
        top: 7px
        left: 0px
        box-sizing: border-box
        width: 16px
        height: 16px
        border: 5px solid #f1f1f1
        border-radius: 50%
        background: $color-theme
</style>
