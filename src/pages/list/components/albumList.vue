<template>
 <div class="wrapper">
    <cube-scroll
      ref="scroll2"
      :data="data"
      class="scroll-list-inner-wrap"
    >
      <info></info>
    </cube-scroll>
    <!-- <loading v-else></loading> -->
 </div>
</template>

<script>
import loading from 'components/loading/loading'
import info from './info'
export default {
  data () {
    return {
      data: [1]
    }
  },
  components: {
    loading,
    info
  },
  methods: {
  },
  created () {
  }
}
</script>
<style lang="stylus" scoped>
.scroll-list-inner-wrap
  position fixed
  top 50px
  bottom 0
  width 100%
  height calc(100% - 80px)
</style>
