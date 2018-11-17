//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {

  },
  onShow: function () {
      if (app.globalData.userInfo == null) {
        if (app.globalData.doNotAutoShowLogin==false) {

        wx.navigateTo({
          url: '/pages/login/login'
        })

      }
      } else {
        console.log(app.globalData.userInfo);
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: app.globalData.hasUserInfo
        });
        console.log(this.data)
      }
      
  },

  gotoLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  bindAboutTap: function () {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  }
})