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
      <song-list :data="formatData" @clickItem = 'addToPlay'> </song-list>
    </Scroll>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { formatSongDetail } from '../common/js/util'
  import infoMixin from '../common/js/infoMixin'
  import { mapMutations } from 'vuex'
  export default {
    name: 'artistsInfo',
    mixins:[infoMixin],
    created() {
      this.getInfo(this.$route.params.id)//将所有
    },
    methods:{
      ...mapMutations([
        'SET_FULLSCREEN', //更改大小播放器的显示
        'SET_PLAY_LIST' , //事件触发后
        'SET_SEQUENCE_LIST',
        'SET_CURRENT_INDEX',
        'SET_MODE'
      ]),
      async getInfo(id){
        const { data } = await axios.get(`artists?id=${id}`) //请求所有歌手数据
        // this.formatData = data.hotSongs
        this.formatData = formatSongDetail(data.hotSongs)
      },
    //  接收并发送从子组件传递到的当前歌曲以及 索引
    //      当组件某一项被点击后，state各项发生变化
      addToPlay(item,index){
        this.SET_FULLSCREEN(true)
        this.SET_PLAY_LIST(this.formatData) //当前歌曲所在的歌曲列表
        this.SET_SEQUENCE_LIST(this.formatData)
        this.SET_CURRENT_INDEX(index)


      }
    }
  }
</script>

<style lang="less" scoped>

</style>