//用于组件需要读取vuex的state的数据时；在组件内使用getters
const getters = {
  fullScreen(state){
    return state.fullScreen
  },
  playList(state){
    return state.playList
  },
  sequencesList(state){
    return state.sequencesList
  },
  currentIndex(state){
    return state.currentIndex
  },
  mode(state){
    return state.mode
  },
  //当前播放的歌曲信息
  currentSong(state){
    return state.playList[state.currentIndex] //用于获取播放歌曲的数据对象，待补充
  }
}
export default getters