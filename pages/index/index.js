//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    loadingText: "内容正在路上",
    sectionCate: ['最新文章', '前端', 'Photoshop'],
    postsList: []
  },

  onReachBottom: function(event) {
    console.log("加载更多")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var blogURL = app.globalConfig.blogURL + '/posts';
    //console.log(blogURL);
    this.getBlogData(blogURL);
    var that = this;

    var blinkTimer=setInterval(function() {
      if(that.data.loading==true){
      var text ="内容正在路上";
      var loadingText = (that.data.loadingText == text + '...') ? text : (that.data.loadingText + '.');
      console.log(loadingText)
      that.setData({
        loadingText: loadingText
      })}
    }, 500)

    //setInterval(function () { a = util.textLoadingBlink("内容正在路上");that.setData({ loadingText:util.textLoadingBlink("内容正在路上")}) }, 200)
  },

  getBlogData: function(url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function(res) {
        var postsList = res.data;
        that.setData({
            postsList: postsList
          }),
          that.setData({
            loading: false
          });
        console.log(that.data.postsList)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})