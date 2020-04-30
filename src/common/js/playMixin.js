// 存放播放歌曲时的公共的方法
import { mapMutations } from 'vuex'
export default {
  methods:{
    ...mapMutations([
      'SET_FULLSCREEN', //更改大小播放器的显示
      'SET_PLAY_LIST' , //事件触发后
      'SET_SEQUENCE_LIST',
      'SET_CURRENT_INDEX',
      'SET_MODE'
    ]),
    addToPlay(item,index){
      this.SET_FULLSCREEN(true)
      this.SET_PLAY_LIST(this.formatData) //当前歌曲所在的歌曲列表
      this.SET_SEQUENCE_LIST(this.formatData)
      this.SET_CURRENT_INDEX(index)
    }
  }


}