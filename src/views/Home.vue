<template>
  <div >
      <div class="header">
        <div class="personal">我的</div>
        <div>MIKO</div>
        <i class="iconfont icon-chaxun"></i>
      </div>
<!--    轮播图-->
      <div class="swiper-content home-item">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for=" (item,index) in newSongData" :key="item.id">
            <img :src ="`${item.song.album.blurPicUrl}?param=400y400`" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
<!--    轮播图-->
<!--分类导航-->
    <ul class="nav">
      <li>
        <div class="icon-container"><i class="iconfont icon icon-date"></i></div>
        <p>每日推荐</p>
      </li>
      <li>
        <div class="icon-container"><i class="iconfont icon icon-music"></i></div>
        <p>歌单</p>
      </li>
      <li>
        <div class="icon-container"><i class="iconfont icon icon-rank"></i></div>
        <p>排行榜</p>
      </li>
    </ul>
<!--分类导航-->
<!--    模板👇-->
<!--    <div class="home-item"  >-->
<!--       <div class="title-wrapper">-->
<!--         <div class="title">每日推荐</div>-->
<!--         <div class="more">-->
<!--           <i class="iconfont icon-more"></i>-->
<!--         </div>-->
<!--       </div>-->
<!--    </div>-->
<!--        模板👆-->
    <div class="home-item"  >
      <div class="title-wrapper">
        <div class="title">每日推荐</div>
        <div class="more" >
          <i class="iconfont icon-more"></i>
        </div>
      </div>
      <div class="play-list-box"  >
        <play-list  :data="playListData"></play-list>
      </div>
    </div>

    <div class="home-item"  >
      <div class="title-wrapper">
        <div class="title">热门歌手</div>
        <div class="more">
          <i class="iconfont icon-more"></i>
        </div>
      </div>
      <ul class="artists-list">
        <li v-for="(item,index) in artistsData" :key="index">
          <img v-lazy="`${item.picUrl}?param=400y400`" alt="">
          <div>
            <p class="name">{{item.name}}</p>
            <p class="info">专辑{{item.albumSize}}张，共{{item.musicSize}}首歌</p>
          </div>
        </li>
      </ul>
    </div>
    <div>11111</div>
  </div>
</template>
<style lang="less" scoped>
  .header{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    background: #f2353c;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
    font-size: 36px;
    .personal{
      color: #f9aeb0;
    }
    i{
      font-size: 36px; //iconfont标签要指明fz值
    }
  }
  .home-item{
    padding: 20px;
    margin-bottom: 20px;
    background: white;
    .play-list-box{
      min-height: 625px;
    }
    .title-wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      .title{
        font-size: 34px;
        border-left: 6px solid #f2353c;
        padding-left: 20px;
        color: #4c4c4c;
      }
      .more{
        width: 50px;
        height: 38px;
        border: 1px solid #ccc;
        border-radius: 25px;
        color: #bfbfbf;
        text-align: center;
        line-height: 38px;

      }
    }
  }
  .swiper-content{
    margin-top:90px ; //header是固定定位
    /*修改小圆点*/
    /*.wrapper /deep/ .swiper-pagination-bullet-active{*/
    /*  background: #ccc;*/
    /*}*/
    .swiper-container{
      width: 100%;
      height: 350px;
      border-radius: 10px;
      overflow: hidden;
      /* 设置圆点样式*/

      --swiper-pagination-color: #ff0000;
      img{
        /*轮播图bug*/
        width: 100%;
        height: 100%  ;
        /*height: 100%;*/
        /*object-fit:cover*/
      }
    }
  }
/*icon导航栏*/
  .nav{
    display: flex;
    /*flex-direction: row;*/
    width: 100% ;
    margin-top: -20px;
    background: white;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    li{
      text-align: center;
    }
    .icon-container{
      background: red;
      width: 120px;
      height: 120px;
      line-height: 120px;
      border-radius: 50%;
      margin-bottom: 20px;
    }
    .icon{
      font-size: 70px;
      color: #fff;
    }
  }
/*   热门歌手   左图右文，经典*/
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
/*  设置小圆点样式*/

</style>
<style>

</style>
<script>
// @ is an alias to /src
import axios from 'axios'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import playList from '../components/IndexComponents/playList'
import 'swiper/css/swiper.css'
export default {
  name: 'Home',
  components: {
    Swiper,SwiperSlide,playList
  },
   data(){
    return {
      swiperOption: { //在这里填写swiper相关配置
        pagination: {
          el: '.swiper-pagination',
          // bulletElement : 'div',

        },
        autoplay: {
          delay:  1000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        }
      },
      newSongData: [] ,// 存放轮播图数据
      playListData : [] ,// 存放歌单数据
      artistsData:[] ,//热门歌手数据
    }
  },
created() {
  this.getNewSong()
  this.getPlayList()
  this.getArtlists()

},
  methods:{
    //请求轮播数据
    async getNewSong (){
      const { data } = await axios.get('/personalized/newsong')
      if(data.code === 200){
        this.newSongData = data.result
        // console.log(this.newSongData);
      }
    },
    //轮播方法,
    //  请求歌单列表
    async getPlayList(){
      const { data } = await axios.get('/personalized')
      if(data.code === 200) this.playListData = data.result.splice(0,6) //截取六条数据
      // console.log(this.playListData);
    },
    //请求热门歌手信息，最多十条
    async getArtlists(){
      const { data } = await axios.get('/top/artists?offset=0&limit=10') //获取十条热门歌手信息
      if(data.code === 200) this.artistsData = data.artists
      console.log(this.artistsData);
    }
  }
}
</script>
