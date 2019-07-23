<template>
  <div class="header">
    <div class="slot">
      <slot name="left"></slot>
    </div>
    <span class="title">{{title}}</span>
    <div class="slot">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Home'
    }
  }
}
</script>


<style lang="stylus" scoped>
.header
  height 50px
  width 100%
  position relative
  container-padding()
  display flex
  justify-content space-between
  align-items center
  color $color-theme
  .slot
    width 80px 
  .title
    font-size 17px
    color $color-text
    font-weight 600
    width 220px
    text-align center
    no-wrap()
</style>
