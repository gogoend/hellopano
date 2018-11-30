// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    networkStatus:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  onUnload: function() {
    app.globalData.doNotAutoShowLogin = true;
  },
  doNotLogin: function() {
    wx.navigateBack({
      delta: 1
    });
    app.globalData.doNotAutoShowLogin = true;
  },
  getUserInfo: function(event) {
    var that = this;
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || [];
    // logs.unshift(Date.now());
    // wx.setStorageSync('logs', logs);
    // 登录
    wx.login({
      success: function(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(event);
        if (event.detail.errMsg.match('fail auth deny')) {
          wx.showModal({
            title: '提示',
            content: '抱歉，小程序没有权限访问您的用户信息，您将不能收藏或点赞。请点击确定，并在弹出页面中打开“使用我的用户信息”选项。',
            confirmColor: "rgb(41,171,226)",
            cancelColor: "#999",
            success: function(res) {
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
            url: app.globalConfig.baseDomain + '/hp_wxapp/cms_gate/auth/wx_auth_handler.php',
            method: 'GET',
            data: {
              'code': res.code
            },
            success: function(res) {
              console.log(res);
              if (res.data.error == "0") {
                wx.setStorageSync("s_id", res.header['Set-Cookie']);
                console.log(wx.getStorageSync("s_id"));
                wx.request({
                  url: app.globalConfig.baseDomain + '/hp_wxapp/cms_gate/auth/wx_auth_handler.php',
                  method: 'GET',
                  header: {
                    cookie: wx.getStorageSync("s_id")
                  },
                  data: {
                    'encrypted_data': event.detail.encryptedData,
                    'iv': event.detail.iv
                  },
                  complete: function(res) {
                    console.log(res);
                    app.globalData.userInfo = event.detail.userInfo;
                    app.globalData.hasUserInfo = true;
                    that.setData({
                      userInfo: event.detail.userInfo,
                      hasUserInfo: true
                    });
                    setTimeout(function() {
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 2000)
                  }
                });
              } else if (res.data.error == "5000") {
                //5000：服务器端没有配置appid和secret。
                wx.showModal({
                  title: '登录失败',
                  content: '小程序服务器发生内部错误，请稍后重试。',
                  showCancel: false
                })
              } else if (res.data.error == "5001" || res.data.error == "5002") {
                //5001：服务器端无法接入微信服务器
                //5002：服务器端凭据有误
                wx.showModal({
                  title: '登录失败',
                  content: '小程序服务器与无法连接微信，请稍后重试。',
                  showCancel: false
                })
              }
            },
            fail: function(res) {
              //本地无网络连接，或者访问不了小程序服务器
              wx.showModal({
                title: '登陆失败',
                content: '无法访问小程序服务器，请稍后重试。',
                showCancel: false,
                confirmColor: "#29ABE2"
              })
              return false;
            }
          });
        }
      },
      fail: function(res) {
        //本地无网络连接
        wx.showModal({
          title: '网络错误',
          content: '请检查您的网络连接',
          showCancel: false,
          confirmColor: "#29ABE2"
        })
        return false;
      }
    });
  }
})