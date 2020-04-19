//vue.config.js
module.exports = {
  // devServer:{
  //         proxy:{
  //           // '/api':{
  //           //   target : 'http://localhost:3000',
  //           //   changeOrigin:true,
  //           //   pathRewrite:{
  //           //     '/api':''
  //           //   }
  //           // }
  //         }
  //  },
//👆 服务端已处理好跨域
  plugins:{
    'postcss-pxtorem': {
      rootValue: 75,// html根元素的fz大小
      propList: ['*']//作用于哪些标签
    }
  }
}