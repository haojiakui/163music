<template>
<!--  mini播放器-->
  <div>
    <div v-show="!fullScreen" class="mini-player" @click.stop="toggleShow(true)">
<!--  👇显示歌手信息-->
      <div class="player-info" @click="toggleShow(true)">
        <div class="player-img">
          <img src="" alt="">
        </div>
        <div>
          <p class="play-name">歌曲名称</p>
          <p class="play-artists">歌手信息</p>
        </div>
      </div>
  <!--  👆显示歌手信息-->
<!--      👇显示点击操作按钮-->
      <div class="play-operate">
<!--     操作按钮区域-->
        <i class="iconfont icon-zanting icon-op"></i>
        <i class="iconfont icon-xiayiqu"></i>
      </div>
  <!--      👆显示点击操作按钮-->
      <div class="mini-progress">
        <!--   进度条-->
      </div>
    </div>
    <transition name="player">
      <div class="player" v-show="fullScreen">
        <div class="player-mask"></div>
        <!--      头部-->
        <div class="player-header">
          <i class="iconfont icon-xia" @click="toggleShow(false)"></i>
          <div class="header-info">
            <p class="">歌曲名称</p>
            <p class="header-artists"> 歌手名</p>
          </div>
        </div>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide  class="img-container">
            <!--          封面里有个img图标，一个心性-->
            <img src="../assets/image/demo1.png" alt="">
            <i class="iconfont icon-xiai"></i>
          </swiper-slide>
          <swiper-slide>
            歌词
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!--        👇底部-->
        <div class="player-operate">
          <div class="operate-mask"></div>
          <!--          进度条-->
          <div class="progress">
            <span class="time">01:12</span>
            <div class="progess-bar">
              <div class="bar-moved"></div>
              <div class="bar-btn"></div>
            </div>
            <span class="time"> 01:12</span>
          </div>
          <!--          控制键-->
          <div class="operator-icon">
            <i class="iconfont icon-liebiaoxunhuan fz-40"></i>
            <i class="iconfont icon-shangyiqu fz-80"></i>
            <i class="iconfont icon-zanting fz-100"></i>
            <i class="iconfont icon-xiayiqu fz-80" ></i>
            <i class="iconfont icon-more fz-40"></i>
          </div>
        </div>
        <!--        👆底部-->
        <!--        👇 大播放器底部-->
      </div>

    </transition>
<!--    👇bottom-->
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'player',
    data(){
      return {
        fullScreen: true,  //根据此字段控制哪个播放器显示
        swiperOption: { //在这里填写swiper相关配置
          pagination: {
            el: '.swiper-pagination',
          }
        }
      }
    },
    methods:{
      toggleShow(val){
        //  迷你播放器与大播放器的动画切换
        this.fullScreen = val
      }
    }
  }
</script>

<style lang="less" scoped>
.mini-player{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #150a06;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 10px 30px 10px 20px;
  z-index: 9999;
  .player-info{
    display: flex;
    align-items: center;
  }
  .player-img{
    width: 80px;
    height: 80px;
    flex-shrink: 0; //保持自身宽度和高度
    border-radius: 50%;
    overflow: hidden;
    border: 4Px solid #695945;
    margin-right: 20px;
    img{
      width: 100%;
    }
  }
  .play-name{
    font-size: 26px;
    margin-bottom: 10px;
    line-height: 30px;
  }
  .play-artists{
    font-size: 20px;
    color: #b2b2b2;
  }
/*  图标区*/
  .play-operate{
    i{
      font-size: 65px;
      color: #c9c3c1;
    }
    .icon-op{
      margin-right: 50px;
    }
  }
  /*进度条*/
  .mini-progress{
    height: 6px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f2353c;
    width: 30%; //宽度最后会根据歌曲长度计算得到，然后动态的添加到该div上
  }
}
/*  大播放器*/
  .player{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    /*background:  no-repeat center center; */
    background-repeat: no-repeat;
    background-position: center center;
    background-image:url("../assets/image/demo1.png") ; //背景图片将会被传递
    background-size: cover;
    overflow: hidden;
    color: #fff;
    &:after{ //模糊效果
      content: '';
      background: inherit;
      width: calc(100% + 80px) ;
      height: calc(100% + 80px);
      position: absolute;
      top: -40px;
      left: -40px;
      -ms-filter:  blur(20px);
      filter: blur(20px) ;
      z-index: -2;
    }
    .player-mask{ //蒙版效果
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: .5;
      z-index: -1;
    }
    .player-header{
      height: 60px;
      padding: 30px;
      i{
        font-size: 46px;
        position: absolute;
        left: 30px;
        top: 30px;
      }
      .header-info{
        width: 70%;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;//文本溢出隐藏
        font-size: 30px;
        .header-artists{
          margin-top: 12px;
          font-size: 18px;
          color: #b2b2b2;
        }
      }
    }
    .swiper-container{
      width: 100%;
      height: calc(100% - 360px);
    }
    .img-container{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      img{
        width: 500px;
        height: 500px;
        border: 20Px solid #2b433c;
        border-radius: 50%;

      }
      i{
        position: absolute;
        bottom: 30px;
        left: 30px;
        font-size: 50px;
        color: #c4b9bb;
      }
    }
  /*  播放器的进度条*/
    .player-operate{
      width: 100%;
      height: 300px;
      position: relative;
      .operate-mask{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.1);
         z-index: -1;
      }
    }
    .progress{
      display: flex;
      align-items: center;
      height: 50px;
      padding: 30px;
      justify-content: center;
      .time{
        width: 60px; //防止由于字体变化，导致的重新计算样式，导致样式塌陷问题

      }
      /* 进度条相关*/
      .progess-bar{
        width: 560px;
        height: 4px;
        background: #7e7374;
        position: relative;
        margin: 0 30px;
      }
      /* 进度条已播放的*/
      .bar-moved{
        position: absolute;
        left: 0;
        top: 0;
        height: 4px;
        background: #f2353c;
        width: 30px; //根据播放进度动态计算
      }
      /*进度条按钮*/
      .bar-btn{
        position: absolute;
        left: 30px;
        top: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        border: 5Px solid #5d5759;
        transform: translate3d(-50%,-50%,0);
      }
    }
  /*  控制图标*/
    .operator-icon{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      color: #c4b9bb;
      .fz-40{
        font-size: 40px;
      }
      .fz-80{
        font-size: 80px;
      }
      .fz-100{
        font-size: 100px;
      }
    }
  }
  .player-enter-active,.player-leave-active{
    transition: all .3s;
    opacity: 1;
    .player-header,.player-operate{
      transform: translate3d(0,0,0);
      transition: all .3s cubic-bezier(0.86,0.18,0.82,1.32); /*贝塞尔曲线*/
    }
  }
  .player-enter,.player-leave-to{
    opacity: 0;
    .player-header{
      transform: translate3d(0,-100px,0);
    }
    .player-operate{
      transform: translate3d(0,100px,0);
    }
  }
</style>