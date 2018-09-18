//app.js
const online = "https://wedding.allschoolthings.com";
const test = "https://weddingtest.allschoolthings.com";
const dev = "http://localhost:2222"
App({
  onShow: function () {
    this.checkUpdate();
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
              //检查权限
              wx.getSetting({
                success: (res) => {
                  if (res.authSetting['scope.userInfo']) {
                    this.globalData.hasAuth = true;
                    if (!this.globalData.userInfo.name) {
                      wx.getUserInfo({
                        withCredentials: false,
                        lang: "zh_CN",
                        success: res => {
                          console.log("getUserInfo", res)
                          this.globalData.userInfo.name = res.userInfo.nickName;
                          this.globalData.userInfo.avatar = res.userInfo.avatarUrl;
                          wx.request({
                            url: this.globalData.url + "/user",
                            method: "POST",
                            data: this.globalData.userInfo
                          })
                        }
                      })
                    }
                  }
                }
              })
            }
          })
        }
      }
    });
  },
  checkUpdate() {
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
  onError(e) {
    wx.request({
      url: this.globalData.url + "/errors",
      method: "POST",
      data: e
    })
  },
  globalData: {
    userInfo: "",
    url: test,
    hasAuth: false
  }
});