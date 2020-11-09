//引入二次封装的ajax
import ajax from '../../utils/ajax.js'
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
  // 发送异步请求,请求录播图数据
  // wx.request({
  //   url: 'http://localhost:3000/banner',
  //   data:{type:2},
  //   // 请求成功后的回调
  //   success:(data)=>{
  //     this.setData({
  //       banners:data.data.banners
  //     })
  //   }
  // })
  
  // 使用封装后的ajax函数进行异步请求
  ajax('/banner',{type:2}).then(data=>{
    this.setData({
      banners: data.banners
    })
  })

    // 请求推荐歌曲列表数据
    ajax('/personalized', { limit: 10 }).then(data => {
      // console.log(data)
      this.setData({
        recommendMusicList: data.result
      })
    })

    // 请求top歌单榜的列表数据
    // 定义一个数组用于存放请求的idx参数的值
    const idxArr=[1,3,5,6,8,23,15,13,18,20]
    // 定义一个初始请求的下标
    let index=0;
    // 定义一个数组用于存放请求回来的数据
    let topList=[]
    while(index<idxArr.length){
      const result =await ajax('/top/list',{idx:idxArr[index++]})
      const {name, tracks}= result.playlist
      topList.push({name,tracks})
      this.setData({
        topList
      })
    }
    

   
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