Page({
  data:{
    // msg:'我是数据1',
    userInfo:{}
  },
//监听页面
  onLoad(){
    // this.setData({
    //   msg:"我是数据2"
    // })
    // console.log(this.data.msg)
    // setInterval(()=>{
    //   console.log(this.data.msg)
    // },1000)
    // debugger
    // this.setData({
    //   msg: "我是数据3"
    // })
    // console.log(this.data.msg)
    console.log('----------onLoad---------')
    wx.getUserInfo({
      success:(data)=>{
        // console.log(data)
        this.setData({
          userInfo:data.userInfo
        })
      }
    })
  },
  // 父级定义的事件方法
handParent(){
   console.log('我是父级事件')
  },
  // 子级定义的事件方法
handChild(){
  console.log('我是子级事件')
  },
  /* 
  在使用路由跳转时,跳转的路由路径一般使用绝对路径,但也可以使用相对路径
   */
//使用navigatetTo,(keep-alive)相当于push,使用该方法跳转页面会被保留,但是最多保留10层(,最开始是5层)
handNavigateTo(){
  wx.navigateTo({
    url: '/pages/log/log',
  })
},
// 使用regirectTo,相当于replace,加载其他页面后,之前的页面会被卸载
handRegirectTo(){
  wx.redirectTo({
    url: '../log/log',
  })
},
// 监听页面显示
onShow(){
  console.log('----------onshow---------')
},
// 监听页面隐藏
  onhide() { console.log('----------onhide---------')},
  // 监听页面卸载
  onUnload() { console.log('----------onUnload---------')},
  // 监听页面初次完成
  onReady() { console.log('----------onReady---------')},



  // 点击获取用户信息
  getUserInfo(data){
    // console.log(data)
    // 判断用户是否同意获取
    if (data.detail.rawData){
      // console.log(data.detail.rawData)
      // 将获取到的哟用户数据设置为响应数据
      this.setData({
        userInfo: data.detail.userInfo
      })
   
    }else{
      console.log('用户授权失败')
    }
  }
})