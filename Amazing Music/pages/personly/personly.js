//引入二次封装的ajax
import ajax from '../../utils/ajax.js'
// pages/personly/personly.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 下拉的距离
    moveDistance:0,
    moveTransform:""
  },

  // 手指触摸的事件
  HandletouchStart(e){
    // console.log('start',e)
    //获取鼠标当前的起始位置 
    this.moveStart=e.touches[0].clientY
    this.setData({
      moveTransform: ''
    })
  },

  // 手指移动的事件
  HandletouchMove(e){
    // console.log('move',e)
    // 获取鼠标移动后的的位置
    let moveMove = e.touches[0].clientY
    const moveDistance = moveMove - this.moveStart
    //设置往回拉的和往下拉的临界值
    // console.log(moveDistance)
   if( moveDistance <= 0 || moveDistance>80)return 
    // 设置状态数据
    this.setData({
      moveDistance,
      
    })
  },

  // 手指离开的事件
  HandletouchEnd(e) { 
    // console.log('end',e)
    this.setData({
      moveDistance:0,
      moveTransform:"transform 2s",
    })
  },

  // 点击跳转到登录界面
  toLogin(){
    // wx.redirectTo({
    //   url: "/pages/login/login",
    // })
    wx.navigateTo({
      url: "/pages/login/login",
    })
  },
  // 界面刚加载的生命周期回调函数
  onLoad(){
    //读取缓存
    // const userInfo=JSON.parse(wx.getStorageSync('userInfo'))
    
    // this.setData({
    //   userInfo
    // })

  },
  
  // 界面再次展示的生命周期回调函数,
 async onShow(){
    const userInfo = JSON.parse(wx.getStorageSync('userInfo')||"{}")
    this.setData({
      userInfo
    })
    // 获取到用户的id 
    const uid = userInfo.userId
   const result = await ajax('/user/record',{uid,type:0})
   const playList=result.allData.map((item,index)=>{
      return {
        id:item.song.id,
        url:item.song.al.picUrl
      }
   }).splice(0,20)
   this.setData({
     playList
   })
  //  console.log(playlist)
  }

})
