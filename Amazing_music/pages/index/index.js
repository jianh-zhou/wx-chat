//引入ajax请求的函数
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
    // 请求轮播图数据
    // wx.request({
    //   url: 'http://localhost:3000/banner',
    //   data:{type:2},
    //   //请求成功的回调
    //   success:(data)=>{
    //     console.log(data.data.banners)
    //     // 直接将其设置为动态数据,不需要事先写好也行
    //     this.setData({
    //       banners:data.data.banners
    //     })
    //   }
    // })

    // 调用对应的方法,进行ajax请求,传入对应需要的数据,返回对应请求回来的数据
    ajax('/banner',{type:2}).then((data)=>{
      // 调用对应的方法,设置动态数据
      this.setData({
        banners: data.banners
      })
    })

    ajax('/personalized', { limit:10 }).then((data) => {
      // console.log(data.result)
      // 调用对应的方法,设置动态数据
      this.setData({
        recommendMusicList: data.result
      })
    })
    
    // 设置一个数组用来保存要请求榜单所需要的数据
    let arrIdx=[1,3,5,6,15,4,21,23,22,26]
    // 设置一个初始请求所需要的数据
    let index=0
    // 设置一个数组,用来保存所有请求回来的数据
    let topList=[]
    while(index<arrIdx.length){
      let result=await ajax('/top/list',{idx:arrIdx[index++]})
      // console.log(result)
      const { name, tracks } = result.playlist
      topList.push({ name, tracks})
      // console.log(topList)     
      this.setData({
        topList,
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