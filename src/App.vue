<template>
  <div id="app">
    <my-home></my-home>
  </div>
</template>

<script>
import myHome from 'pages/home/home.vue'

export default {
  name: 'app',
  components: {
    myHome
  }
}
</script>

<style>
#app {
  width: 100%;
  overflow: hidden;
}
</style>
