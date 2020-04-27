<template>
  <div ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'scroll',
    components:{
      BScroll
    },
    props:{
      data:{
        type : Array,
        default (){
          return []
        }
      }
    },
    watch:{
       data(val){
         this.$nextTick(()=>{
           this.refresh()
         })
       }
    },
    mounted() {
      this.$nextTick(()=>{
        //当组件挂载完毕以后执行scroll方法
        this.initScroll()
      })
    },
    methods:{
      //初始化时

      initScroll(){
        if(!this.$refs.scrollWrapper) return
        this.scroll = new BScroll(this.$refs.scrollWrapper)
      },
      // 刷新后，dom已经初始化
      //数据发生改变时refresh调用，数据发生改变基于父级传入slot的具体内容(props接收)
      refresh(){
        this.scroll && this.scroll.refresh() //或者
      },
      scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
      },
      scrollTo(){
        this.scroll &&  this.scroll.scrollTo.apply(this.scroll,arguments)
      }

    }
  }
</script>

<style lang="less" scoped>

</style>