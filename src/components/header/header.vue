<template>
  <div class="header">
    <slot name="left"></slot>
    <span class="title">{{title}}</span>
    <slot name="right"></slot>
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
  container-padding()
  display flex
  justify-content space-between
  align-items center
  color $color-theme
  .title
    font-size 17px
    color $color-text
    font-weight 600
</style>
