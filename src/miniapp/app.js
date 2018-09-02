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
  },
  getFont() {
    
  },
  onError(e) {
    console.error(e);
  },
  globalData: {
    userInfo: "",
    url: "https://wedding.allschoolthings.com",
    backup: "https://wedding.allschoolthings.com",
  }
});