<template>
  <button class="btn">Play</button>
</template>
 <style lang="stylus" rel="stylesheet/stylus" scoped>
btn-active($bg, $border = null)
  &.btn_active, &:active
    background: $bg
      // if $border != null
      //   border-1px($border)
  a:active
    background #000
  .btn
    btn-active('#fff')
</style>

<style scoped>
.btn {
  display: block;
    margin: 0;
    padding: 17px 16px;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    color: #fff;
    background: #4a4c5b;
    outline: none;
    border: none;
    border-radius: 2px;
    box-sizing: border-box;
    transition: all .5s;
    -webkit-tap-highlight-color: transparent;
}
.bth:active{
  background: #fff;
}
</style>
