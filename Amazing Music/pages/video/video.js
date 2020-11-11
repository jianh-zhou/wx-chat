// 引入ajax
import ajax from '../../utils/ajax.js'
// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],//视频列表标签数据
    currentId:58100,//选中的视频标签id
    videoList:[],//视频列表数组
    selecrImgId:'',//选中的视频表面图片id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const result=await  ajax('/video/group/list')
    // console.log(result)
    const navList=result.data.slice(0,14)
    // console.log(navList)
    this.setData({
      navList,
    })
    // 调用对应的请求视频列表的方法
    this.getVideoList()
  },

  // 点击视频标签栏切换
  changeNav(e){
    // console.log(e)
    const currentId = e.currentTarget.dataset.id
    this.setData({
      currentId
    })
    // // 发送请求,切换视频标签栏
    // ajax('/video/group', { id: currentId})
    // 调用对应的请求视频列表的方法
    this.getVideoList()
  },
  //封装一个方法用来请求视频数据
  async getVideoList(){
    // 设置正在请求的提示
    wx.showLoading({
      title: '正在加载中',
    })
    //进行请求
    const result = await ajax('/video/group',{id:this.data.currentId})
    // console.log(result)
    // 关闭请求提示
    wx.hideLoading()
    // 将请求回来的数据进行过滤等一系列操作
    const videoList=result.datas.map(item=>item.data)
    // 将获取到的数据设置为动态数据
    this.setData({videoList})

  },

  // 视频播放触发的回调函数
  handlePlay(e){
    // 获取当前视频标签的id
    const id=e.currentTarget.id
    // 判断this上是否有一个id,如果有则说明有一个视频可能在播放,而且判断当前播放的视频和上一次点击播放的视频是不是一样
    if(this.videoId&&(this.videoId!==id)){
      // 创建一个contextVideo对象,根据传入的id,生成的对象可以控制之前视频标签
      const videoContext=wx.createVideoContext(this.videoId)
      videoContext.pause()
    }
    // 将当前视频的id保存起来,方便下次使用
    this.videoId=id
  },

  // 点击对应图片播放对应视频
  handleImg(e){
    //获取当前图片的id
    const selecrImgId =e.currentTarget.id
    // 设置对应的动态数据,以显示对应的视频标签
    this.setData({
      selecrImgId
    })
    //创建对应的对象,控制对应的视频进行播放
    const videoContext=wx.createVideoContext(selecrImgId)
    videoContext.play()
  }

})