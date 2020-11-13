// 引入二次封装的ajax
import ajax from '../../utils/ajax.js'
// 引入pubsub
import PubSub from 'pubsub-js'
// pages/recommend/recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDay: "",
    nowMonth: "",
    recommendList:[],
    currentIndx:0//点击的对应歌曲对应的下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 获取当前时间戳
    const now = new Date()
    // 获取当前的日期
    this.setData({
      nowDay: now.getDate(),
      nowMonth: now.getMonth()
    })
    const result = await ajax('/recommend/songs')
    this.setData({
      recommendList: result.recommend
    })
    PubSub.subscribe('informSwitch',(msg,data)=>{
      // 获取之前保存的下标
      let { currentIndx, recommendList}=this.data
      // console.log(currentIndx, recommendList)
      // 判断是上一首还是下一首
      if(data==='next'){
        //判断是否是最后一首
        currentIndx >= (recommendList.length-1)?(currentIndx=0):currentIndx++
      }else{
        currentIndx === 0 ? currentIndx = recommendList.length - 1:currentIndx--
      }
      // 将这个下标更新 
      this.setData({
        currentIndx
      })
      // 获取这个下标对应的元素id
      const id = recommendList[currentIndx].id
      PubSub.publish('switchSong',id)
    })
    
  },

  // 点击对应的音乐,跳转到播放器
  toMusicPlayer(e){
    // console.log(e)
    // 获取当前歌曲id
    const {id,index} = e.currentTarget.dataset
    // 保存当前歌曲的下标
    this.setData({
      currentIndx:index
    })
    // 跳转到对应的界面,并且将当前的id路由传参传递过去
    wx.navigateTo({
      url: '/pages/song/song?songId='+id,
    })

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