<template>
<!--  歌单视图  歌单详情页-->
  <div class="page">
  <div>
    <m-header>
      全部歌单
    </m-header>
    <div class="play-wrapper">
      <play-list :data="playListData" @clickItem = 'gotoPlayListInfo '></play-list>
    </div>
  </div>
<!--    包裹-->
    <transition name="slide">
      <router-view/>
    </transition>
</div>
</template>
<!---->
<script>
  import mHeader from '../components/mHeader'
  import playList from '../components/util/playList'
  import axios from  'axios'
  export default {
    name: 'playListView',
    components:{
      mHeader,playList
    },
    data(){
      return {
        playListData : [] //获取歌单数据
      }
    },
    methods:{
     async  getPlayListData(){
        const { data } = await  axios.get('/personalized')
       if(data.code === 200){
         this.playListData = data.result
       }
     },
    //  点击子组件后监听到子组件传递的item项，然后
      gotoPlayListInfo(item){
       this.$router.push({
         name:'PlayListViewInfo',
         params:{
           id:item.id
         }
       })
       //  console.log(11,item);
      }
    },
    created() {
      this.getPlayListData()
    }
  }
</script>

<style lang="less" scoped>
.play-wrapper{
  margin-top: 90px;
  background: white;
  padding: 30px 20px;
}
</style>