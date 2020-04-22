<template>
<!--  每日推荐页面-->
  <div  class="content">
    <top
         :title="title"
         :count = newSongData.length
         :img="img">

    </top>

      <Scroll :data="newSongData" class="recommonend-list">
        <song-list :data="newSongData"> </song-list>
      </Scroll>

  </div>
</template>

<script>
import axios from 'axios'
import Top from '../components/util/top'
import songList from '../components/util/songList'
import Scroll from '../components/util/scroll'
  export default {
    name: 'recommoned',
    components:{
     Top,songList,Scroll
    },
    data(){
      return {
        newSongData : []
      }
    },
    computed:{
      //将接受到的数据在展示前在computed这里做判断：
      //
      title(){
        if(this.newSongData.length > 0){
          return this.newSongData[0].name
        }
        else {
          return '暂无数据'
        }
      },
      img(){
        if(this.newSongData.length >0){
          return this.newSongData[0].song.album.picUrl
        }
        else {
          return ''
        }
      }
    },
    methods:{
      async getNewSong (){
        const { data } = await axios.get('/personalized/newsong')
        if(data.code === 200){
          this.newSongData = data.result
          // console.log(this.newSongData);
        }
      }
    },
    mounted() {
      this.getNewSong()
    }
  }
</script>

<style lang="less" scoped>
  .content{
    padding-bottom: 40px;
  }
.recommonend-list{
  height: calc(100vh - 380px);
  overflow: hidden;
}
</style>