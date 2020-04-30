import { playMode } from "../common/js/aliasConfig";
const state = {
  fullScreen : false , //控制大小播放器  false : 小播放器  true : 大播放器
  playList: [] ,//当前的播放列表
  sequencesList:[],//存放初始的播放列表数据
  currentIndex : 0 ,//当前播放的歌曲在整个播放列表中的位置，有利于计算当前播放歌曲的信息
  mode: playMode.sequence, //默认是顺序播放 0：顺序播放； 1：循环播放 2：随机播放
//
  historyList:JSON.parse(localStorage.getItem('HistoryList')) || [],//只能为字符串，使用JSON.parse转成对象
  loveList: JSON.parse(localStorage.getItem('LoveList')) || [],
  searchTest: JSON.parse(localStorage.getItem('SearchTest')) || [],
}
export default state