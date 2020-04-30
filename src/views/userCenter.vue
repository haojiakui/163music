<template>
  <div class="page">
<!--    个人中心-->
    <m-header :red="false">个人中心</m-header>
    <div class="user-bg">
      <img src="../assets/image/user-bg.png">
      <p>阿萨姆</p>
    </div>
    <ul class="user-list">
      <li @click="goToPage('userPlayList')">
        <div class="icon-wrap">
          <i class="iconfont icon-music"></i>播放列表
        </div>
        <i class="iconfont icon-you"></i>
      </li>
      <li @click="goToPage('userLoveList')">
        <div class="icon-wrap">
          <i class="iconfont icon-xiai"></i>我的收藏
        </div>
        <i class="iconfont icon-you"></i>
      </li>
      <li @click="goToPage('userHistoryList')">
        <div class="icon-wrap">
          <i class="iconfont icon-guangdie"></i>最近听过
        </div>
        <i class="iconfont icon-you"></i>
      </li>
    </ul>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import mHeader from '../components/mHeader'
  export default {
    name: 'user-center',
    components:{
      mHeader
    },
    methods:{
      goToPage(path){
        this.$router.push({
          name:path
        })
      }
    }


  }
</script>

<style lang="less" scoped>
.user-bg{
  width: 100%;
  height: 400px;
  background: url("../assets/image/user-bg.png") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-bottom: 30px;
  img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
    margin-top: 60px;
  }
}

  .user-list{
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      padding: 0 30px;
      background: #fff;
      font-size: 30px;
      color: #333;
      border-bottom: 1Px solid #e6e6e6;
      margin-bottom: 5px;
      .icon-wrap{
        display: flex;
        align-items: center;
        i{
          margin-right: 20px;
        }
      }

      i{
        font-size: 40px;
        color: #ccc;
      }
    }
  }
</style>