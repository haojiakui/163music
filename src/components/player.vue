<template>
<!--  mini播放器-->
  <div>
    <div v-show="!fullScreen" class="mini-player" @click.stop="toggleShow(true)">
<!--  👇显示歌手信息-->
      <div class="player-info" @click="toggleShow(true)">
        <div class="player-img">
          <img :src="songImg" alt="">
        </div>
        <div>
          <p class="play-name">{{songName}}</p>
          <p class="play-artists">
            <span v-for="(item,index) in songArtists" :key="index">{{item.name}}</span>
          </p>
        </div>
      </div>
  <!--  👆显示歌手信息-->
<!--      👇显示点击操作按钮-->
      <div class="play-operate">
<!--     操作按钮区域-->
        <i class="iconfont  icon-op" :class="playIcon" @click.stop="togglePlay"></i>
        <i class="iconfont icon-xiayiqu" @click.stop="next"></i>
      </div>
  <!--      👆显示点击操作按钮-->
      <div class="mini-progress" :style="{width : `${barPercent}`}">
        <!--   进度条-->
      </div>
    </div>
    <transition name="player">
      <div class="player" v-show="fullScreen" :style="{'backgroundImage': `url(${songImg})`}">
        <div class="player-mask"></div>
        <!--      头部-->
        <div class="player-header">
          <i class="iconfont icon-xia"  @click="toggleShow(false)"></i>
          <div class="header-info">
            <p class="">{{songName}}</p>
            <p class="header-artists">
              <span v-for="(item,index) in songArtists" :key="index">{{item.name}}</span>
            </p>
          </div>
        </div>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide  class="img-container">
            <!--          封面里有个img图标，一个心性-->
            <img :src="songImg" alt="">
            <i class="iconfont icon-xiai"></i>
          </swiper-slide>
          <swiper-slide>
            <p>歌词</p>
            <span>{{lyricData}}</span>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!--        👇底部-->
        <div class="player-operate">
          <div class="operate-mask"></div>
          <!--          进度条-->
          <div class="progress">
            <span class="time">{{formatTime(currentTime)}}</span>
            <div class="progess-bar"  ref="progessBar" @click="progressClick">
              <div class="bar-moved" :style="{width:`${barPercent}`}"></div>
              <div class="bar-btn"
                   :style="{left:`${barPercent}`}"
                   @touchmove.prevent = "progressMove"
                   @touchend.prevent = "progressEnd"
              >
<!--                标识进度的小按钮-->
              </div>
            </div>
            <span class="time">{{formatTime(overTime)}}</span>
          </div>
          <!--          控制键-->
          <div class="operator-icon">
            <i class="iconfont  fz-40" :class="modeIcon" @click="changeMode"></i>
            <i class="iconfont icon-shangyiqu fz-80" @click="prev"></i>
            <i class="iconfont   fz-100" :class="playIcon" @click="togglePlay"></i>
            <i class="iconfont icon-xiayiqu fz-80" @click="next" ></i>
            <i class="iconfont icon-more fz-40"></i>
          </div>
        </div>
        <!--        👆底部-->
        <!--        👇 大播放器底部-->
      </div>

    </transition>
<!--    👇bottom-->
<!--    ref属性是为了将来找到该dom对象，控制该对象的播放暂停-->
    <audio :src="musicData.url" @timeupdate="updataTime"  ref="audio" @ended="end"></audio>

  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import { mapGetters,mapMutations } from 'vuex'
  import axios from 'axios'
  import { playMode } from "../common/js/aliasConfig";

  export default {
    name: 'player',
    components:{
      Swiper,
      SwiperSlide
    },
    data(){
      return {
        fullScreen: false,  //根据此字段控制哪个播放器显示
        swiperOption: { //在这里填写swiper相关配置
          pagination: {
            el: '.swiper-pagination',
          }
        },
        musicData:{},//歌曲数据
        lyricData: null, //歌词数据
        playing: false, //播放的状态
        loaded:false,
        currentTime:0, //播放的时间
        overTime: 0 ,//结束的时间
        touchBarWillMove: false, //光标锁
      }
    },
    computed :{
      ...mapGetters([
        // 'fullScreen',
        'playList',
        'sequencesList',
        'currentIndex',
        'mode',
        'currentSong'
      ]),
      songName(){
        return this.currentSong ? this.currentSong.name : '这里空'
      },
      songArtists(){
        return this.currentSong  ? this.currentSong.ar : []
      },
      songImg(){
        return this.currentSong ? `${this.currentSong.al.picUrl}?param=400y400` : ''
      },
      playIcon(){
        return this.playing ? 'icon-bofang' : 'icon-zanting'
      },
      modeIcon(){
        return this.mode === playMode.sequence ? 'icon-liebiaoxunhuan' : (this.mode === playMode.loop ? 'icon-danquxunhuan' : 'icon-suiji')
      },
      barPercent(){
        //计算播放的百分比
        let p = this.currentTime / this.overTime
        if(p === 0){
          return 0
        }
        p = Number((p * 100).toFixed())
        return `${p}%`
      }
    },
    watch :{
      currentSong(newVal,oldVal){
      //  当用户没有选定播放的歌曲时，此时currentSong为undefined，无法进行下一步操作，当用户选择了某项时，currentsong就有了内容
      // 然后currentSong的值发生变化时，开始请求该歌曲的内容
        if(oldVal === undefined || newVal.id !== oldVal.id){
          //当oldval为undefined时，说明选中了某项歌曲，所以开始请求该歌曲的地址
          //当currentSong的new与old不同时，说明切换了歌曲，就要再请求一次歌曲url
          this.getMusicUrl(newVal.id)
          this.getLyricData(newVal.id)
        }
      }
    },
    methods:{
      ...mapMutations([
        'SET_FULLSCREEN',
        'SET_PLAY_LIST',
        'SET_SEQUENCE_LIST',
        'SET_CURRENT_INDEX',
        'SET_MODE'
      ]),
      toggleShow(val){
        //  迷你播放器与大播放器的动画切换
        this.fullScreen = val
      },
      async getMusicUrl(id){
        const { data } = await  axios.get(`song/url?id=${id}`)
        if(data.code === 200 && data.data[0].code === 200){
          this.musicData = data.data[0]
          this.$nextTick(()=>{
            this.togglePlay(true)
          //  不管当前有没有在播放，在dom加载完毕后都必须播放当前歌曲地址
          })
        }
      },
      async getLyricData(id){
        const { data } = await axios.get(`lyric?id=${id}`)
        if( data.code === 200 ){
          this.lyricData = data.lrc.lyric//需要格式化歌词
        }
      },
      togglePlay(val){
        // 点击切换播放状态
        if(!this.currentSong) return; //确保内部有歌曲数据
        if(val === true || val === false){
          this.playing = val
        }else{
          this.playing = !this.playing
        }
        const audio = this.$refs.audio
        if(this.playing){
          audio.play()
        }else{
          audio.pause()
        }
      },
      prev(){
        // 上一首歌曲按钮
        const len = this.playList.length;
        let newIndex = this.currentIndex -1;
        newIndex < 0 ? newIndex = len - 1 : newIndex;
        this.SET_CURRENT_INDEX(newIndex)
      },
      next(){
      //  下一首歌曲按钮
        const len = this.playList.length;
        let newIndex = this.currentIndex + 1;
        newIndex === len ? newIndex = 0 : newIndex;
        this.SET_CURRENT_INDEX(newIndex)
      },
      changeMode(){
        // 更改播放模式
        const modeNumber = (this.mode + 1) % 3;
        this.SET_MODE(modeNumber);
      //  更新播放列表
        let newPlayList = [];
        if(this.mode === playMode.random){
          newPlayList = this.getRandomList(this.sequencesList)//this.sequencesList 是歌单被初次添加到播放列表里的备份
        }else{
          newPlayList = this.sequencesList
        }
        //  为保证当前播放器还在播放当前歌曲，需要找到新的播放的index

        const newIndex = newPlayList.findIndex(item =>
          item.id === this.currentSong.id
         );

        this.SET_PLAY_LIST(newPlayList);
        this.SET_CURRENT_INDEX(newIndex);
      },
      getRandomList(arr){
        const newArr = [].concat(arr);
        return newArr.sort((a,b)=>(Math.random() >0.5 ? -1 : 1))
      },
      end(){
        // 当前歌曲播放完毕后根据播放模式播放下一首歌曲
        if(this.mode === playMode.loop){
          this.loop()
        }else {
          this.next()
        }
      },
      loop(){
        const audio = this.$refs.audio
        audio.currenTime = 0
        audio.play()
      },
    //进度条
      updataTime(e){
      //  随着歌曲的播放不停的触发这个方法
        if(!this.touchBarWillMove  )  {
          this.currentTime = e.target.currentTime;
          this.overTime = e.target.duration;
        }
      },
      formatTime(val){
        // 格式化时间
        if(isNaN(val)) return '00.00'
        let m = Math.floor(val / 60)
        let s = Math.floor(val % 60)
        if(m < 10){
          m = `0${m}`
        }
        if(s < 10){
          s = `0${s}`
        }
        return `${m}:${s}`
      },
    //  光标控制歌曲
      progressMove(e){ // 拖动光标控制歌曲进度条
        console.log('用户拖动了进度条 ，松开即播放');
        this.touchBarWillMove = true
        //触摸屏幕时当前触摸在屏幕上时距离左边水平方向的值
        const pageX = e.touches[0].pageX
        this.calcPercent(pageX)
      },
      //光标控制歌曲播放
      progressEnd(){
        console.log('用户松开了手指，开始播放');
        this.resetPlayer()
      },
      calcPercent(x){
        const offsetLeft = this.$refs.progessBar.offsetLeft//触摸点到最左边的距离
        const barWidth = this.$refs.progessBar.clientWidth //进度条的总长度
        let movedWidth = x - offsetLeft
        if(movedWidth > barWidth) movedWidth = barWidth
        if(movedWidth <= 0) movedWidth = 0
        let p = movedWidth / barWidth
        this.currentTime = this.overTime * p
      },
      //公共播放方法
      resetPlayer(){
        this.$refs.audio.currentTime = this.currentTime
        this.togglePlay(true)
        this.touchBarWillMove =false
      },
      //点击播放
      progressClick(e){
        console.log('用户点击了某一进度，开始播放');
        this.touchBarWillMove = true
        const pageX = e.pageX
        this.calcPercent(pageX)
        this.resetPlayer()
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
   // width: 30%; //宽度最后会根据歌曲长度计算得到，然后动态的添加到该div上
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
        //width: 30px; //根据播放进度动态计算
      }
      /*进度条按钮*/
      .bar-btn{
        position: absolute;
        left: 0;
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