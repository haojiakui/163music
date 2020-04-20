<template>
<!--  单个歌手列表组件-->
  <ul class="song-list">
<!--    左图  右边上下两行文字-->
    <li v-for="(item,index) in data" :key="index">
      <div>
        <img v-lazy="`${item.song.album.picUrl}?param=400y400`" alt="">
      </div>
      <div>
        <p class=" ">{{item.name}}</p>
        <p class="artist"><span v-for="(ii,index) in item.song.album.artists" :key="index">{{ii.name}}</span></p>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'songList',
    props:{
      data:{
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.song-list{
  margin-bottom: 30px;
  li{
    padding:   30px;
    display: flex;
    align-items: center;
    border-bottom: 1Px solid #e6e6e6;
    font-size: 30px;
    background: white;
    img{
      width: 80px;
      height: 80px;
      margin-right: 25px;
    }
    .artist{
      font-size: 20px;
      color: #b2b2b2;
      margin-top: 10px;
    }
  }
}
</style>