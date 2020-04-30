<template>

    <div class="page">
      <mHeader>我的收藏</mHeader>
      <count class="mt90">{{loveList.length}}</count>
      <scroll class="user-list-container">
        <song-list :data="loveList" @clickItem="addToPlay(item,index)"></song-list>
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
    name: 'userLoveList',
    components:{
      mHeader,count,Scroll,songList
    },
    mixins:[playMixin],
    computed:{
      ...mapGetters([
        'loveList'
      ])
    },
    methods:{
      addToPlay(item, index) {
        this.SET_FULLSCREEN(true);
        this.SET_PLAY_LIST(this.loveList);
        this.SET_SEQUENCE_LIST(this.loveList);
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