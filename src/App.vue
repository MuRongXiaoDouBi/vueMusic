<template>
  <div id="app">
    <keep-alive :exclude="exclude">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      exclude: ['Albumlist']
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  overflow: hidden;
}
</style>
