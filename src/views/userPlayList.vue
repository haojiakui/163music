<template>
  <div class="page">

      <mHeader>播放列表</mHeader>
      <count class="mt90">{{playList.length}}</count>
      <scroll class="user-list-container">
        <song-list :data="playList" @clickItem="addToPlay"></song-list>
      </scroll>
  </div>
</template>

<script>
  import mHeader from  '../components/mHeader'
  import count from '../components/count'
  import Scroll from '../components/util/scroll'
  import songList from '../components/util/songList'
  import { mapGetters } from 'vuex'
  import playMixin from "../common/js/playMixin";

  export default {
    name: 'userPlayList',
    components:{
      mHeader,count,Scroll,songList
    },
    mixins:[playMixin],
    computed:{
      ...mapGetters([
        'playList'
      ])
    },
    methods:{
      addToPlay(item, index) {
        this.SET_FULLSCREEN(true);
        this.SET_PLAY_LIST(this.playList);
        this.SET_SEQUENCE_LIST(this.playList);
        this.SET_CURRENT_INDEX(index);
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-list-container{
    height: calc(100vh - 280px);
    overflow: hidden;
  }
</style>