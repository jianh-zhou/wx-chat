//引入ajax二次封装的函数
import ajax from '../../utils/ajax.js'
// pages/presonly/personly.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{a:1}
  },

  // 手指触摸的事件

  handleTouchStart(e){
    // console.log(e.touches[0].clientY)
    //记录手指触摸的时鼠标的位置
    this.moveStart = e.touches[0].clientY
    // 设置动态数据,让动画的属性为空
    this.setData({
      moveTransform:"",
      // list:[]
    })
  },
  // 手指移动的事件
  handleTouchMove(e){
    // console.log(2)
    // 定义变量保存块需要移动的距离
    const distance=e.touches[0].clientY-this.moveStart
    //设置临界值
    if(distance<0||distance>80){
      return
    }
    // 设置动态数据
    this.setData({
      distance
    })
  },

  // 手指离开的事件
  handleTouchEnd(){
    // console.log(3)
    // 设置动态数据
    this.setData({
      moveTransform: 'transform 1s',
      distance:0
    })
  },

  // 点击头像区域跳转到对应的登录界面
  toLogin(){
    // 判断用户是否登录过
    // const userInfo = JSON.parse(wx.getStorageSync('userInfo') || '{}')
    if(this.data.userInfo.userId)return
    wx.navigateTo({
      url:"/pages/login/login"
    })
  },
  // 当前界面显示的生命周期回调函数
 async onShow(){
    // 从缓存中读取到对应的用户信息数据
    const userInfo=JSON.parse(wx.getStorageSync('userInfo')||'{}')
    // 将读取到的用户数据,进行过滤
    const { nickname, avatarUrl, userId}=userInfo
    // 更新数据
    this.setData({
      userInfo: { nickname, avatarUrl, userId }
    })

    // 
    // const { userId } = userInfo
    if (!userId) return
   const result=await ajax('/user/record', { uid: userId, type: 0 })
  //  console.log(result)
    const list=result.allData.map((item)=>{
      return {
        id:item.song.id,
        url: item.song.al.picUrl
      }
    }).slice(0,10)
    console.log(list)
    // 将获取到的最近播放音乐设置为动态数据
    this.setData({
      list
    })
  },

  // 界面刚加载的生命周期回调函数
 async onLoad(){
    // console.log(this.data)
    // 获取uid
    // const {userId}=this.data
  //  console.log(this.data.userInfo)
  //  ajax('/user/record',{uid:userId,type:0})

  }
})