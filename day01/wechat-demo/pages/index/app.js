Page({
  data:{
    msg:'我是数据1',
  },
  onLoad(){
    this.setData({
      msg:"我是数据2"
    })
    console.log(this.data.msg)
    setInterval(()=>{
      console.log(this.data.msg)
    },1000)
    debugger
    this.setData({
      msg: "我是数据3"
    })
    console.log(this.data.msg)
  }
  
})