module.exports = {
  plugins:{
    autoprefixer:{
    },
    'postcss-pxtorem' :{
      rootValue: 75,//页面html根节点设置的fz的大小
      propList:['*'] //匹配到的标签
    }
  }
}