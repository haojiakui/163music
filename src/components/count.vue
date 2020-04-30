<template>
<!--  共有多少首歌-->
  <div class="count">
    共有<slot></slot>首歌
  </div>
</template>

<script>
  export default {
    name: 'count'
  }
</script>

<style lang="less" scoped>
  .count{
    width: 100%;
    height: 80px;
    line-height: 80px;
    padding-left: 30px;
    font-size: 26px;
    color: #808080;
  }
</style>