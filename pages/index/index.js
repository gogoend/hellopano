//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  onReachBottom: function (event) {
    console.log("加载更多")
    },
    

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var blogURL = app.globalConfig.blogURL+'/posts';
    this.getBlogData(blogURL);
  },
  getBlogData:(url)=>{
    wx.request({
      url: url,
      method:'GET',
      header:{
        "Content-Type":""
      },
      success:function(res){
        console.log(res)
      },
      fail:function(error){
        console.log(error)
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})