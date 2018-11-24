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
    // baseDomain: 'http://localhost',
    // blogURL: 'http://localhost/wp-json/wp/v2'
  }
});