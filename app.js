//app.js
App({
  globalData: {
    userInfo: null,
    hasUserInfo:false,
    doNotAutoShowLogin:false
  },
  globalConfig:{
    baseDomain:'https://blog.me4vr.com',
    blogURL:'https://blog.me4vr.com/wp-json/wp/v2',
    baseDomain: 'http://localhost',
    blogURL: 'http://localhost/wp-json/wp/v2'
  },
  onLaunch:function(){
    var app = this;
    if(!wx.getStorageSync("s_id")){
      return false;
    }else{
    wx.login({
      success: function (res) {
         {
          wx.request({
            url: app.globalConfig.baseDomain + '/hp_wxapp/cms_gate/auth/wx_auth_handler.php',
            method: 'GET',
            data: {
              'code': res.code
            },
            success: function (res) {
              console.log(res);
              if (res.data.error == "0") {
                wx.setStorageSync("s_id", res.header['Set-Cookie']);
                console.log(wx.getStorageSync("s_id"));
                wx.request({
                  url: app.globalConfig.baseDomain + '/hp_wxapp/cms_gate/auth/wx_auth_handler.php?continue=yes',
                  method: 'GET',
                  header: {
                    cookie: wx.getStorageSync("s_id")
                  },
                  complete: function (res) {
                    console.log(res);
                    app.globalData.userInfo = res.data;
                    app.globalData.userInfo.avatarUrl = app.globalConfig.baseDomain + '/hp_wxapp/cms_gate/auth/wx_auth_handler.php?avatar=' + app.globalData.userInfo.uuid
                    app.globalData.hasUserInfo = true;
                    // that.setData({
                    //   userInfo: event.detail.userInfo,
                    //   hasUserInfo: true
                    // });
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
            fail: function (res) {
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
      fail: function (res) {
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
  }
});