<template>
  <div class="title">
    <span class="left">{{title}}</span>
    <span class="right">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type:String,
      default: 'New Title'
    }
  }
}
</script>


<style lang="stylus" scoped>
  .title
    height 60px
    display flex
    align-items center
    justify-content space-between
    font-size $font-size-small
    .right
      color $color-theme
</style>
