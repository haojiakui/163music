<template>
<!--  内页头部公用组件-->
  <div class="header" :class="{'red': red }">
    <i class="iconfont icon-zuo" @click="goBack"></i>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'mHeader',
    props:{
      red : {
        type : Boolean,
        default(){
          return  true
        }
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
.header{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 90px;
  line-height: 90px;
  font-size: 34px;
  color: #fefefe;
  text-align: center;
  i{
    position: absolute;
    left: 20px;
    font-size: 50px;
  }
  &.red{
    background: #f2353c;
  }
}

</style>