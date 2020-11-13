// 引入ajax封装的函数
import ajax from '../../utils/ajax.js'
// 引入pubsub
import PubSub from 'pubsub-js'
// 获取全局页面的方法
let appInstance=getApp()
// pages/song/song.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false,
    songId:'',//当前歌曲的id
    musicInfo:{},//对应的歌曲信息
    songName:'',//歌曲的名字
    musicUrl:'',//歌曲播放的url地址

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log(options)
    // 将传递过来的id保存起来
    this.setData({
    songId: options.songId
    })
    // 调用对应请求歌曲信息的函数
    this.getMusicInfo()

   // 定义一个背景音乐播放对象
      this.backgroundAudioManager=wx.getBackgroundAudioManager()
    //调用绑定背景音乐监听的方法,从而搬到监听
    this.watchBackgroundMusic()
    // 
  },

  // 封装一个方法,根据id获取对应的歌曲信息
  async getMusicInfo(){
    const songId=this.data.songId
    const result = await ajax('/song/detail',{'ids':songId})
    // 将得到的歌曲信息数据保存起来 
    this.setData({
      musicInfo:result.songs[0]
    })
    // 将歌曲名字设置在头部
    wx.setNavigationBarTitle({
      title: result.songs[0].name
    })
    
  },

  // 点击播放的按钮的回调函数
  async handlePlay(flag){
// 判断是不是点击播放暂停
    if(flag instanceof Object){
      this.setData({
        isPlaying: !this.data.isPlaying
      })
    }
    // 调用获取歌曲播放地址的方法
   await this.getAutioUrl()
    // 根据获取到的url播放音乐
    // 调用切换播放音乐的状态
    this.changeAudioPlay()

  },

  // 封装一个方法,根据id获取歌曲的播放地址
  async  getAutioUrl(){
    // 发送请求,获取歌曲的详细信息
    const result = await ajax("/song/url",{id:this.data.songId})
    // console.log(result)
    // 将获取到的音乐的url地址保存起来
    this.setData({
      musicUrl:result.data[0].url
    })
  },

  // 封装一个方法,用来控制当前音乐的状态
  changeAudioPlay(){
    const { musicUrl, musicInfo, songId}=this.data
    // 根据当前的播放状态,控制音乐的播放和暂停
    if(this.data.isPlaying){
      //设置背音频的url地址
      this.backgroundAudioManager.src = musicUrl
      // 设置背景音频的名字
      this.backgroundAudioManager.title = musicInfo.name
      // 当前播放是处于播放状态的id,将其这个状态保存起来
      appInstance.globalData.playState=true
      appInstance.globalData.songId = songId
    }else{
      // 关闭音乐
        this.backgroundAudioManager.pause()
    }
  },

  // 封装一个方法,用来执判断当前的状态是否在播放
  isSanmeSong(){
    const { playState, songId } = appInstance.globalData
    // 判断上一次音乐的状态和当前音乐状态是否一样而且是否是同一首歌曲
    // console.log(this.data.songId, songId, playState)
    if (songId === this.data.songId && playState) {
      // 满足条件,则设置音乐的播放页面为播放
      this.setData({
        isPlaying: true
      })
      // //设置背音频的url地址
      // this.backgroundAudioManager.src = this.data.musicUrl
      // // 设置背景音频的名字
      // this.backgroundAudioManager.title = this.data.musicInfo.name
    }
  },

  // 定义一个方法,专门用来绑定背景音频播放事件的监听
  watchBackgroundMusic(){
    //调用一个方法判断当前播放是否是和之前播放的是同一首歌
    this.isSanmeSong()
    this.backgroundAudioManager.onPlay(()=>{
      //调用一个方法判断当前播放是否是和之前播放的是同一首歌
      this.isSanmeSong()

    })
    //背景音乐暂停触发的监听
    this.backgroundAudioManager.onPause(()=>{
      this.setData({
        isPlaying: false
      })
    })
  },

  // 上一首或者下一首的切换
  switchSong(e){
    // 判断当前点击的是上一首还是下一首
    const {id}=e.currentTarget
    PubSub.publish('informSwitch',id)
    PubSub.subscribe('switchSong',(msg,data)=>{
      this.setData({
        songId:data
      })
      // 获取歌曲信息
       this.getMusicInfo()
      //  this.setData({
      //    isPlaying:false
      //  })
      //  播放对应的歌曲,传递一个标识方便当做是否是点击切换歌曲
      this.handlePlay(true)
    })
  }


})