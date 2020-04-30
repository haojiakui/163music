<template>
<!--  排行榜页面-->
  <div class="page">
  <top
          :title="title"
          :count = formatData.length
          :img="img">
  </top>
  <Scroll :data="formatData" class="page-info-list">
    <song-list :data="formatData" @clickItem="addToPlay"> </song-list>
  </Scroll>
  </div>
</template>

<script>
  import axios from 'axios'
  import infoMixin from '../common/js/infoMixin'
  import {  formatSongDetail} from '../common/js/util'
  import playMixin from "../common/js/playMixin";
  export default {
    name: 'rankInfo',
     mixins: [infoMixin,playMixin],
    created() {
      this.getInfo(this.$route.params.id)//将所有
    },
    methods:{
      async getInfo(id){
        const { data } = await axios.get(`playList/detail?id=${id}`) //请求所有歌手数据
        // console.log(data.playlist.tracks);
        this.formatData = formatSongDetail(data.playlist.tracks)
        // this.formatData = formatSongDetail(data.playList)
        // console.log(this.formatData);
      }
    }
  }
</script>

<style lang="less" scoped>

</style>