<template>
<!--  单个热门歌手详情页-->
  <div>
    <div class="top" :style="{'backgroundImage': `url(${img}?param=400y400)`}">
      <m-header :red = false >{{title}}</m-header>
      <img :src="`${img}?param=400y400`" alt="">
    </div>
    <count>{{count}}</count>

  </div>
</template>

<script>
  import mHeader from  '../mHeader'
  import count from '../count'
  export default {
    name: 'top',
    components:{
      mHeader,count
    },
    props:{
        title:{
          type : String,
          default: ''
        },
        img:{
          type : String,
          default: ''
        },
        count:{
          type : Number,
          default:0
        }
    }
  }
</script>

<style lang="less" scoped>
.top{
  width: 100%;
  height: 300px;
  background: no-repeat center center;
  /*background-image:  url("../../assets/image/demo1.png"); bgim 不能写死，要通过绑定style*/
  -webkit-background-size: cover;
  background-size: cover;
  position: relative;
  overflow: hidden;

  /*👇：给div.top背景变得模糊*/
  &:after{
    content: '';
    width: calc(100% + 160px)  ;
    height: calc(100% + 160px)  ;
    position: absolute;
    left: calc(0 - 80px) ;
    top:  calc(0 - 80px);
    right: 0;
    bottom: 0;
    background: inherit;//继承父级
    filter: blur(10px);
    -webkit-filter: blur(10px);

  }
  img{
    border: 10px solid #9e8d7f;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 60%;
    z-index: 999;
    transform: translate(-50%,-50%);
  }
}

</style>