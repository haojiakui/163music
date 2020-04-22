<template>
<!--  歌手组件-->
<!--    向下拷贝的列表结构-->
    <ul class="artists-list">
      <li v-for="(item,index) in data" :key="index">
        <img v-lazy="`${item.picUrl}?param=400y400`" alt="">
        <div>
          <p class="name">{{item.name}}</p>
          <p class="info">专辑{{item.albumSize}}张，共{{item.musicSize}}首歌</p>
        </div>
      </li>
    </ul>
<!--  向上拷贝的列表结构-->

</template>

<script>
  export default {
    name: 'artistList',
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      }

    }
  }
</script>

<style lang="less" scoped>
  .artists-list{
    li{
      display: flex;
      width: 100%;
      align-items: center;
      padding: 30px;
      border-top: 1PX solid #e6e6e6; //
      margin-left: -20px; //解决由于padding导致的边框未撑满全容器
      margin-right: -20px;//解决由于padding导致的边框未撑满全容器
      img{
        width: 80px;
        height: 80px;
        margin-right: 20px;
      }
      .name{
        font-size: 30px;
        color: #000;
        margin-bottom: 20px;
      }
      .info{
        font-size: 24px;
        color: #b2b2b2;
      }
    }
  }
</style>