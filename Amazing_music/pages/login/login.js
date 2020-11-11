//引入ajax二次封装的函数
import ajax from '../../utils/ajax.js'
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"15330649175",
    password:"164377ZHOU567"
  },

  // 手机表单信息的回调函数
  handleInptValue(e){
    // console.log(e)
    //获取当前表单的输入的类型
    const type=e.target.dataset.type
    // 设置动态数据
    this.setData({
      [type]:e.detail.value
    })
  },

  // 点击登录按钮,进行登录
async  handeleLogin(){
    // 
    // 获取到手机号和密码
    const {phone,password}=this.data
    // 判断用户是否输入过手机号和密码
    if(!phone.trim()||!password.trim()){
      wx.showToast({
        title: '请输入用户名或者密码',
        icon:'none'
      })
      return
    }

    const result = await ajax('/login/cellphone',{phone,password,isLogin:true})
    // console.log(result)
    const code=result.code
    switch(code){
      case 200:
      // 提示登录成功
      wx.showToast({
        title: '登录成功,页面即将跳转',
        icon:"none"
      })
      // 将获取到的用户信息数据设为缓存
        wx.setStorageSync('userInfo', JSON.stringify(result.profile))
      // 跳转到个人中心页面
        wx.switchTab({
          url: '/pages/presonly/personly',
        })
        return
      case 400:
        wx.showToast({
          title: '登录失败,手机号码错误',
          icon: "none"
        })
        return
      case 502:
        wx.showToast({
          title: '登录成功,密码输入错误',
          icon: "none"
        })
        return
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