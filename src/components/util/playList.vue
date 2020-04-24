<template>
<!--  点击查看每日推荐后出现的页面-->
<!--  一张图片，上面有播放按钮-->
<!--  img是歌手，p是描述信息-->
<!--  点击后会进入播放详情-->
<!--  接受父组件传递的值-->
  <div>
    <ul class="play-list">
      <li v-for="(item,index) in data" :key="index" @click="handleClick(item)">
<!--        <img v-lazy="`${{item.picUrl}}?param=400y400`" alt="">-->
        <img v-lazy=" `${item.picUrl}?param=400y400`" alt="">
        <p class="remd_text">{{item.name}}</p>
        <i class="iconfont icon-zanting"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'playList',
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      //👇将用户点击的某一项歌单项发给父组件处理
      handleClick(val){
        this.$emit('clickItem',val)

      }
    }


  }
</script>

<style lang="less" scoped>
.play-list{
  li{
    width: 220px;
    display: inline-block;
    margin-right: 25px;
    margin-bottom: 25px;
    color: #333;
    font-size: 24px;
    vertical-align: top;
    position: relative;
    &:nth-child(3n){
      margin-right: 0;
    }
    img{
      width: 220px;
      height: 220px;
      margin-bottom: 15px;
    }
    .remd_text{
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    i{
      position: absolute;
      top: 170px;
      right: 10px;
      font-size: 40px;
      color: white;
    }
  }
}
</style>