//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });  
  },
  globalData: {
    userInfo: null,
    rootUrl: "https://wedding.allschoolthings.com",
  }
});