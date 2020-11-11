// 引入二次封装的ajax
import ajax from '../../utils/ajax.js'
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'15330649175',
    password:'164377ZHOU567'
  },

  //定义一个回调函数用来收集对应表单中的手机号和密码的数据
  handeleInputValue(e){
    // 获取到当前表单的自定义属性
    let type=e.target.dataset.type
    // console.log(e)
    // 根据表单的类型收集数据
    this.setData({
      [type]:e.detail.value
    })
  }, 

  // 定义一个回调函数用来登录
  async handleLogin(){
    // 拿到表单中收集的数据
    const {password,phone}=this.data
    // console.log(password,phone)
    // 校验表单输入框
    if (!password.trim()||!phone.trim()){
      wx.showToast({
        title: '请输入用户名或密码',
        icon:'none'
      })
      return
    }
    // // 定义一个Symbol数据
    // const symbol=Symbol('login')
    const result = await ajax('/login/cellphone', { phone, password, isLogin:true })
   if(result.code===200){
     wx.showToast({
       title: '登录成功,页面即将跳转',
       icon: 'none'
     })
    //  跳转到个人中心
     wx.switchTab({
       url: "/pages/personly/personly",
     })
    //  console.log(result)
    //  设置缓存
     
     wx.setStorageSync('userInfo', JSON.stringify(result.profile))
   } else if (result.code === 400){
     wx.showToast({
       title: '用户名错误,请重新输入',
       icon: 'none'
     })
   } else if (result.code === 502){
     wx.showToast({
       title: '密码错误,请重新输入',
       icon: 'none'
     })
    //  wx.switchTab({
    //    url: "pages/personly/personly",
    //  })
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})