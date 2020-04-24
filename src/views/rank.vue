<template>
<!--  排行榜页面-->
  <div class="page">
  <div>
    <m-header>排行榜</m-header>
    <div class="rank-wrapper">
      <div>
        <p class="rank-title">官方榜</p>
        <ul  class="officeList" >
          <li class="list-item"
              @click="goToRankInfo(item.id)"
              v-for="(item,index) in officeListData" :key="index">
            <img v-lazy="`${item.coverImgUrl}?param=400y400`" alt="">
            <div>
              <ul>
                <li v-for="(listItem,listIndex) in item.tracks" class="list-txt"
                    :key="listIndex">
                  {{listIndex + 1}}.{{listItem.first}}-{{listItem.second}}
                </li>
              </ul>
              <i class="iconfont icon-zanting"></i>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <p class="rank-title">推荐榜</p>
        <ul class="rank-list">
          <li v-for="(item,index) in recommendListData"
              @click="goToRankInfo(item.id)"
              :key="index">
            <img v-lazy="`${item.coverImgUrl}?param=400y400`" alt="">
              <p>{{item.name}}</p>
            <i class="iconfont icon-zanting"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import axios from  'axios'
  import mHeader from '../components/mHeader'
  export default {
    name: 'rank',
    components:{
      mHeader
    },
    data(){
      return {
        officeListData:[],
        recommendListData : []
      }
    },
    created(){
      this.getTopListData()
    },
    methods:{
      async getTopListData(){
        const { data } = await axios.get('/toplist/detail')//请求回的数据前四条是官方榜，后面的是
        if(data.code === 200){
          this.officeListData = data.list.slice(0,4)
          this.recommendListData = data.list.slice(4,data.list.length)
        }
      },
      goToRankInfo(id){
        this.$router.push({
           name:'RankInfo',
            params:{
             id
            }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.rank-wrapper{
  margin-top: 90px;
}
.rank-title{
  padding: 30px 20px 10px ;
  font-size: 26px;
  line-height: 1;
}
  .officeList{
    background: white;
    .list-item{
      display: flex;
      position: relative;
      padding: 30px 20px;
      align-items: center;
      border-bottom: 1Px solid #e6e6e6;
      i{
        position: absolute;
        right: 20px;
        top: 30px;
        font-size: 50px;
        color: #808080;
      }
      img{
        width: 200px;
        height: 200px;
        margin-right: 50px;
      }
      .list-txt{
        font-size: 22px;
        color: #808080;
        padding: 10px 0;
        line-height: 1.5;
      }
    }
  }


  .rank-list{
    padding: 30px 20px;
    background: white;
    li{
      display: inline-block;
      width: 220px;
      margin-right: 25px;
      margin-bottom: 40px;
      color: #333;
      vertical-align: top;
      position: relative;
      line-height: 1.5;
      &:nth-child(3n){
        margin-right: 0;
      }
      img{
        width: 100%;
        margin-bottom: 15px;
      }
      i{
        position: absolute;
        top: 150px;
        right: 20px;
        color:  white;
        font-size: 40px;
      }
    }
  }
</style>