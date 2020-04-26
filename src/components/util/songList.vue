<template>
<!--  单个歌手列表组件-->
  <ul class="song-list">
<!--    左图  右边上下两行文字-->
                                            <!--  item,指当前歌曲，index指当前歌曲所在的播放列表的索引              -->
    <li v-for="(item,index) in data" :key="index" @click="handleClick(item,index)">
      <div>
        <img v-lazy="`${item.al.picUrl}?param=400y400`" alt="">
      </div>
      <div>
        <p class=" ">{{item.name}}</p>
        <p class="artist">
          <span v-for="(ii,index) in item.ar" :key="index">{{ii.name }}</span>
        </p>
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
    },
    methods:{
      handleClick(item,index){
        this.$emit('clickItem',item,index)

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