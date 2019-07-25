<template>
  <div class="list">
    <list-title title="Tracklist">
      <span>Shuffle</span>
    </list-title>
    <list-view :list="list"></list-view>
  </div>
</template>

<script>
import listTitle from 'components/listTitle/listTitle'
import listView from 'components/listView/listView'
export default {
  props: {
    list: Array
  },
  components: {
    listTitle,
    listView
  }
}
</script>

<style lang="stylus" scoped>
  .list
    container-padding()
</style>
