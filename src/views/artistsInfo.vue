<template>
  <div class="page">
<!--  歌手的详情页面-->
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

  import { formatSongDetail } from '../common/js/util'
  import infoMixin from '../common/js/infoMixin'
  export default {
    name: 'artistsInfo',
    mixins:[infoMixin],
    created() {
      this.getInfo(this.$route.params.id)//将所有
    },
    methods:{
      async getInfo(id){
        const { data } = await axios.get(`artists?id=${id}`) //请求所有歌手数据
        this.formatData = data.hotSongs
      }
    }
  }
</script>

<style lang="less" scoped>

</style>