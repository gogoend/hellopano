// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onUnload: function () {
    app.globalData.doNotAutoShowLogin = true;
  },
  doNotLogin:function(){
    wx.navigateBack({
      delta: 1
    });
    app.globalData.doNotAutoShowLogin=true;
  },
  getUserInfo: function (event) {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    // 登录
    wx.login({
      success: function (res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(event);
        if (event.detail.errMsg.match('fail auth deny')) {
          wx.showModal({
            title: '提示',
            content: '抱歉，小程序没有权限访问您的用户信息，您将不能收藏或点赞。请点击确定，并在弹出页面中打开“使用我的用户信息”选项。',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                wx.openSetting()
              } else {
                return false;
              }
            }
          })
        } else {
          wx.request({
            url: app.globalConfig.baseDomain + '/cms_core/auth/wx_auth_handler.php',
            method: 'GET',
            data: {
              'code': res.code
            },
            success: function (res) {
              console.log(res);
              wx.setStorageSync("s_id", res.header['Set-Cookie']);
              console.log(wx.getStorageSync("s_id"));
              wx.request({
                url: app.globalConfig.baseDomain + '/cms_core/auth/wx_auth_handler.php',
                method: 'GET',
                header: {
                  cookie: wx.getStorageSync("s_id")
                },
                data: {
                  'encrypted_data': event.detail.encryptedData,
                  'iv': event.detail.iv
                },
                complete: function (res) {
                  //console.log(res);
                  app.globalData.userInfo = event.detail.userInfo;
                  app.globalData.hasUserInfo=true;
                  that.setData({
                    userInfo: event.detail.userInfo,
                    hasUserInfo: true
                  });
                  setTimeout(function(){
                    wx.navigateBack({
                      delta: 1
                    })
                  },2000)
                }
              });
            }
          });
        }
      },
      fail: function () {
        console.log("登录失败，请检查网络连接");
        return false;
      }
    }
    );
  }
})