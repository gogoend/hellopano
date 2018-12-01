//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogURL : app.globalConfig.blogURL + '/posts',

    loadingStatus: "loading",
    loadingText: "",
    sectionCate: ['最新文章', '前端', 'Photoshop'],
    postsList: [],
    blinkTimer: null,
  },

  onReachBottom: function(event) {
    console.log("加载更多")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getBlogData(that.data.blogURL);
    // setTimeout(function () {
    //   if (that.data.postsList.length == 0 && that.data.loading == true) {
    //     clearInterval(that.data.blinkTimer);
    //     that.setData({
    //       loadingText: '加载超时，请检查网络连接。'
    //     });
    //   }
    // }, 5000)

  },
  tapRetry:function(e){

    this.getBlogData(e.currentTarget.dataset.url)
  },

  getBlogData: function(url) {
    var that = this;
    that.setData({ loadingStatus: "loading", loadingText:"内容正在路上"})
    that.data.blinkTimer = setInterval(function() {
      if (that.data.loadingStatus == "loading") {
        var text = "内容正在路上";
        var loadingText = (that.data.loadingText == text + '...') ? text : (that.data.loadingText + '.');
        console.log(loadingText);
        that.setData({
          loadingText: loadingText
        });
      } else {
        console.log(that.data.blinkTimer);
        clearInterval(that.data.blinkTimer);
      }
    }, 500);

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
            loadingStatus: "finish"
          });
        console.log(that.data.postsList)
      },
      fail: function(error) {
        clearInterval(that.data.blinkTimer);

        that.setData({
          loadingStatus: "error",
          loadingText: '加载失败，请检查网络连接。'
        });
        wx.showModal({
          title: '网络错误',
          content: '加载失败，请检查网络连接。是否重试？',
          showCancel: true,
          cancelText: '否',
          cancelColor: '#999999',
          confirmText: '是',
          confirmColor: '#29ABE2',
          success: function(res) {
            if (res.confirm) {
              that.getBlogData(url);
            } else {
              return;
            }
          },
          fail: function(res) {},
          complete: function(res) {},
        });
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