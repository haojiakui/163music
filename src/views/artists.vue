<template>
<!--  歌手视图-->
  <div class="page">
  <div>
    <m-header >全部歌手</m-header>
    <artist-list :data="artistsData"
      @clickItem="gotoArtistsInfo"
      class="artist"></artist-list>
  </div>
    <transition name="slide"><!--👈使用name属性定制组件过渡样式-->
    <router-view/>
    </transition>
  </div>
</template>

<script>
  import mHeader from '../components/mHeader'
  import artistList from '../components/util/artistList'
  import axios from 'axios'
  export default {
    name: 'artists',
    components:{
      mHeader,artistList
    },
    data(){
      return {
        artistsData:[]
      }
    },
    methods:{
      async getArtlists(){
        const { data } = await axios.get('/top/artists?offset=0') //&limit=30获取十条热门歌手信息
        if(data.code === 200) this.artistsData = data.artists //不加参数表示请求全部数据
        // console.log(this.artistsData);
      },
      gotoArtistsInfo(item){
        this.$router.push({
          name:'ArtistsInfo',
          params:{
            id:item.id
          }
        })
      }
    },
    created() {
      this.getArtlists()
    },

  }
</script>

<style lang="less" scoped>
.artist{
  margin-top: 90px;
  margin-bottom: 20px;
  background: white;
  padding: 0 20px;
}
</style>