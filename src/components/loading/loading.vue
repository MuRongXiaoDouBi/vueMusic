<template>
  <div class="loading">
    <div class="loader"></div>
  </div>
</template>

<style lang="stylus" scoped>
.loading {
  width 100%
  height 100%
  position fixed;
  display: flex;
  justify-content center
  font-size: 50px;
  color: $color-theme;
  transition: 0.3s color, 0.3s border;
  z-index: 9999;
}
.loader {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-top 100px;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
  position: relative;
}

.loader:before,
.loader:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 50%;
  border: 0.1em solid transparent;
  border-bottom-color: currentcolor;
  top: 0;
  left: 0;
  -webkit-animation: 1s loader linear infinite;
  animation: 1s loader linear infinite;
}

.loader:before {
  width: 80px;
  height: 80px;
}

.loader:after {
  width: 70px;
  height: 70px;
  -webkit-animation-direction: reverse;
  animation-direction: reverse;
}

@-webkit-keyframes loader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
