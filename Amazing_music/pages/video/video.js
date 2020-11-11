// 引入二次封装的ajax函数
import ajax from '../../utils/ajax.js'
// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],//选中栏目的对应选项数组
    currentId: 58100,//选中的栏目的id值
    videoList:[],//视频数据数组
    triggered:false,//对应栏目是否在最左侧
    palyVideoId:'',//根据视频封面图的id设置对应的视频和图片之间的切换
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 进行请求获取数据
    const data =await ajax('/video/group/list')
    // console.log(data)
    // 将数据进行过滤截取
    const navList=data.data.map(item=>{
      return {
        id:item.id,
        name:item.name
      }
    }).slice(0,14)
    // console.log(navList)
    // 设置为动态数据
    this.setData({
      navList
    })
    //调用请求视频的方法
    this.getVideoList()
  },

  // 点击对应的选择栏选择
  checkNav(e){
    // console.log(e)
    //获取当前的id属性
    const id = e.currentTarget.id.slice(3)
    this.setData({
      currentId:id*1
    })
    // console.log(JSON.parse(wx.getStorageSync('userInfo')))
    // ajax("/video/group",{id:id*1})
    // 调用请求视频的方法
   this.getVideoList()
  },

  //封装一个方法,用来请求视频数据
  async getVideoList(){
    wx.showLoading({
      title: '正在加载',
    })
    this.setData({
      triggered: true,
      videoList:[]
    })
    const result = await ajax("/video/group",{id:this.data.currentId})
    wx.hideLoading()
    // console.log(result)
    //对获取到的数据进行过滤操作
    const videoList= result.datas.map(item=>{
      return item.data
    })
    this.setData({
      videoList,
      triggered:false
    })
    },


  // 点击下拉触发的事件
  handlePullDown(){

    this.getVideoList()

  },

  // 滑动到底部触发的事件
  scrolltolower(){
    // console.log(1)
    // 定义一个数据
    const data = this.data.videoList.concat(this.data.videoList.slice(0, 2)) 
    // console.log(data)
    this.setData({
      videoList:data
    })
  },

  // 点击视频暂停触发的事件
  videoPlay(e){
    // 获取当前视频标签的id
    // console.log(e)
    const id = e.currentTarget.id
    // console.log (id)
    // 判断是否存在上一次的id
    if (this.videoId && (this.videoId!==id)){
     const createVideo= wx.createVideoContext(this.videoId)
      createVideo.pause()
    }
    // 保存当前的id供下次暂停使用
    this.videoId=id
  },
  
  // 点击图片播放对应的视频
  playVideo(e){
    // 获取当前图片的id
    const id=e.currentTarget.id
    console.log(id)
    // 将该id设置为对于视频播放所需要的id
    this.setData({
      palyVideoId:id
    })
    // 自动播放对应视频
    const createVideo=wx.createVideoContext(id)
    createVideo.play()
  }
  })