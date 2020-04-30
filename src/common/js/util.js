// 工具库 => 对接收到的数据进行清洗
export function formatSongDetail(val) {
  const newVal =  []
  if(val!==undefined){
    val.forEach(e=>{
      const detail = {} //用于存储数组内每一个对象的值
      detail.id  = e.id
      detail.al = Object.assign({}, e.al || e.album || e.song.album);
      detail.ar = [].concat(e.ar || e.artists || e.song.artists);
      detail.name = e.name
      newVal.push(detail)
    })
    return newVal
  }


}