<template>
<!--  每日推荐页面-->
  <div class="page">
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
import { formatSongDetail } from "../common/js/util";
export default {
    name: 'recommoned',
    mixins: [infoMixin],
    methods:{
      async getNewSong (){
        const { data } = await axios.get('/personalized/newsong')
        if(data.code === 200){
          //这一步 开始导入工具方法
          this.formatData = formatSongDetail(data.result)

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

</style>