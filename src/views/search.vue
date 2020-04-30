<template>
  <div class="page">
<!--    将子页面显示的方法就是使用pageclass-->
<!--    搜索界面-->
    <div class="search-header">
      <i class="iconfont icon-chaxun" @click="searchSongs"></i>
      <input type="text"  v-model="keyWord" @keyup.enter="searchSongs" @focus="toggleResultShow(false)">
      <i class="iconfont icon-shanchu2" v-show="keyWord" @click="clearKeyWord"></i>
      <div class="cancel" @click="goback">取消</div>
    </div>
    <scroll class="history-list list-container" v-show="!resultShow">
      <ul>
        <li class="list-title" v-if="searchText.length > 0">
          搜索历史
        </li>
        <li class="list-item history-item" v-for="(item,index) in searchText" :key="index" @click="addToSearch(item)">{{item}} <i class="iconfont icon-shanchu1" @click.stop="delKeyword(item)"></i></li>

        <li class="list-title">
          热门搜索
        </li>
        <li  class="list-item "  v-for="(item,index) in hotWords" :key="`hot-${index}`" @click="addToSearch(item.first)">{{item.first}}</li>
      </ul>
    </scroll>
    <div v-show="resultShow">
      <p class="list-count">共有{{resultData.length}}首歌曲</p>
      <scroll class=" list-container  result-list">
        <ul>
          <li class="list-item history-item" v-for="(item, index) in resultData" :key="index" @click="addToPlay(item, index)"  >
            <p>{{item.name}}</p>
            <p class="artists-name">
               <span v-for="(item, index) in item.ar" :key="index">
                {{item.name}}
              </span>
            </p>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from '../components/util/scroll'
  import { mapMutations,mapGetters } from 'vuex'
  import { formatSongDetail } from "../common/js/util";
  import axios from 'axios'
  import playMixin from "../common/js/playMixin";

  export default {
    name: 'search',
    components:{
      Scroll
    },
    mixins:[playMixin]
  ,
    data(){
      return {
        resultShow:false ,//控制列表的显示与隐藏
        hotWords: [],
        keyWord: '',
        resultData: []
      }
    },
    methods:{
      ...mapMutations([
        'SET_SEARCH_TEXT',
        'DEL_FROM_SEARCH_TEXT',
        'SET_FULLSCREEN',
        'SET_PLAY_LIST',
        'SET_SEQUENCE_LIST',
        'SET_CURRENT_INDEX'
      ]),
    //  请求热门歌手页
      async searchHotwords(){
          const { data } = await axios.get('search/hot')
          if(data.code === 200){
            this.hotWords = data.result.hots

          }
      },
      //点击热门歌手某项即搜索
      addToSearch(val){
        this.keyWord = val
        this.searchSongs()
      },
      toggleResultShow(val) {
        this.resultShow = val;
      },
    //  取消
      goback(){
        this.$router.back()
      },
      //点击图标后将所在历史列表删除
      delKeyword(val){
        this.DEL_FROM_SEARCH_TEXT(val)//
      },
      clearKeyWord(){
        this.keyWord = ''
      },
      async searchSongs() {
        if (!this.keyWord.trim()) return;
        const { data } = await axios.get(`search?keywords=${this.keyWord}`);
        console.log(11,data);
        if (data.code === 200) {
          this.resultData = formatSongDetail(data.result.songs);
        }
        this.SET_SEARCH_TEXT(this.keyWord);
        this.toggleResultShow(true);
      },
      addToPlay(item, index) {
        this.SET_FULLSCREEN(true);
        this.SET_PLAY_LIST(this.resultData);
        this.SET_SEQUENCE_LIST(this.resultData);
        this.SET_CURRENT_INDEX(index);
      }
    },
    created() {
      this.searchHotwords()
    },
    computed:{
      ...mapGetters([
        'searchText'
      ])
    }
  }
</script>

<style lang="less" scoped>
  .search-header{
    padding: 15px 30px;
    background-color:#f2353c;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    input{
      border-radius: 10px;
      height: 60px;
      font-size: 32px;
      color: #999;
      padding-left: 65px;
      flex: 1;
      box-sizing: border-box;
      outline: none;
    }

    .icon-chaxun{
      position: absolute;
      left: 45px;
      top: 29px;
      font-size: 32px;
      color: #999;
    }

    .icon-shanchu2{
      position: absolute;
      top: 29px;
      right: 130px;
      font-size: 32px;
      color: #999;
    }

    .cancel{
      margin-left: 30px;
      font-size: 28px;
      color: white;
    }
  }

  .history-list{
    height: calc(100vh -  200px);
  }
  .list-container{
    overflow: hidden;

    .list-title{
      padding: 0 30px;
      line-height: 65px;
      font-size: 24px;
      color: #989898;
    }

    .list-item{
      padding: 30px;
      font-size: 28px;
      color: #333;
      background-color: white;
      border-bottom: 1PX solid #e6e6e6;
    }

    .history-item{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .icon-shanchu1{
      font-size: 30px;
      color: #999;
    }

    .artists-name{
      margin-top: 10px;
      color: #b2b2b2;
      font-size: 20px;
    }
  }

  .list-count{
    padding: 0 30px;
    line-height: 80px;
    font-size: 26px;
    color: #808080;
  }

  .result-list{
    height: calc(100vh -  280px);
  }
</style>