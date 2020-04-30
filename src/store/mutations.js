const mutations = {
  //控制大小播放器
  SET_FULLSCREEN(state,val){
      state.fullScreen = val
  },
  //将正播放的歌曲的所在列表
  SET_PLAY_LIST(state,val){
    state.playList = val
  },

  SET_SEQUENCE_LIST(state,val){
    state.sequencesList = val
  },

  SET_CURRENT_INDEX(state,val){
    state.currentIndex = val
  },

  SET_MODE(state,val){
    state.mode = val
  },
  DEL_FROM_PLAYLIST(state,val){
   const index  = state.playList.findIndex(item=>item.id === val.delsong.id)
    state.playList.splice(index,1)
    //如果删除的是当前播放歌曲，
    if(val.delsong.id !== val.cursong.id){
      state.currentIndex = state.playList.findIndex(item=>item.id === val.cursong.id)
    }
  },
//  历史播放，我喜欢的
  SET_HISTORY_LIST(state,val){
  //  val:当前播放歌曲的整个对象
    let haveHistory = false;
    for (let i = 0; i < state.historyList.length ; i+=1 ) {
      if(state.historyList[i].id === val.id ){
        haveHistory = true;
        return;
      }
    }
    if (!haveHistory){
      this.state.historyList.push(val)
    }
    localStorage.setItem('History',JSON.stringify(state.historyList))
  },
  SET_LOVE_LIST(state,val){
    let haveLove = false;
    for (let i = 0; i < state.loveList.length ; i += 1 ) {
      if(state.loveList[i].id === val.id ){
        haveLove = true;
        return;
      }
    }
    if (!haveLove){
      this.state.loveList.push(val)
    }
    localStorage.setItem('LoveList',JSON.stringify(state.loveList))
  },
  //红心
  DEL_FROM_LOVE_LIST(state,val){
    const index = state.loveList.findIndex(item=>item.id === val.id)
    state.loveList.splice(index,1)
    localStorage.setItem('LoveList',JSON.stringify(state.loveList))
  },
  //将搜索历史词添加到state里
  SET_SEARCH_TEXT(state,val){
  //  判断这个关键字是否已被存储
    let haveText = false;
    for (let i = 0; i < state.searchTest.length; i += 1) {
      if(state.searchTest[i] === val.trim()){
        haveText = true
        return
      }
    }
    if(!haveText){
      state.searchTest.unshift(val) //插入到数组的前面
      state.searchTest =  state.searchTest.splice(0,10)//超过十条就不再截取
    }
    localStorage.setItem('SearchText',JSON.stringify(state.searchTest))
  },
//  点击删除关键字
  DEL_FROM_SEARCH_TEXT(state,val){
    for (let i = 0; i < state.searchTest.length; i += 1) {
      if(state.searchTest[i] === val.trim()){
        state.searchTest.splice(i,1)
      }
    }
    localStorage.setItem('SearchText',JSON.stringify(state.searchTest))
  }

}
export default mutations