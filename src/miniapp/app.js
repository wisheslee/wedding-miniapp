//app.js
App({
  onLaunch: function () {
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: this.globalData.url + '/login',
            method: "POST",
            data: {
              code: res.code
            },
            success: (res) => {
              wx.setStorageSync("userInfo", res.data.data);
              this.globalData.userInfo = res.data.data;
            }
          })

        }
      }
    });
    //检查权限
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.globalData.hasAuth = true;
        }
      }
    })
  },
  onError(e) {
    console.error(e);
  },
  globalData: {
    userInfo: "",
    url: "http://localhost:2222",
    online: "https://wedding.allschoolthings.com",
    dev: "http://localhost:2222",
    hasAuth: false
  }
});