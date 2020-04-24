import Top from '@/components/util/top.vue'
import songList from '@/components/util/songList.vue'
import Scroll from '@/components/util/scroll.vue'
export default {
  components:{
    Top,songList,Scroll
  },
  data(){
    return {
      formatData:[]
    }
  },
  computed:{
    //将接受到的数据在展示前在computed这里做判断：
    //
    title(){
      if(this.formatData.length > 0){
        return this.formatData[0].name
      }
      else {
        return '暂无数据'
      }
    },
    img(){
      if(this.formatData.length >0){
        return this.formatData[0].al.picUrl
      }
      else {
        return ''
      }
    }
  }
}