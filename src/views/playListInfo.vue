<template>
   <div class="page">
<!--  歌单的详情页面-->
  <div  class="content">
    <top
            :title="title"
            :count = formatData.length
            :img="img">
    </top>
    <Scroll :data="formatData" class="page-info-list">
      <song-list :data="formatData"> </song-list>
    </Scroll>
  </div>
   </div>
</template>

<script>
  import axios from 'axios'
  import infoMixin from '../common/js/infoMixin'
  import { formatSongDetail } from '../common/js/util'
  export default {
    name: 'playListInfo',
    mixins : [infoMixin],
    created() {
      this.getInfo(this.$route.params.id)//将所有
    },
    methods:{
      async getInfo(id){
        const { data } = await axios.get(`playList/detail?id=${id}`) //请求所有歌手数据
        // this.formatData = formatSongDetail(data.playList.tracks)
        // console.log(formatSongDetail(data.playList));
        // console.log(formatSongDetail(data.playList));
        this.formatData = formatSongDetail(data.playlist.tracks);
      }

    }
  }
</script>

<style lang="less" scoped>

</style>