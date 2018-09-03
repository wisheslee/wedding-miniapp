//app.js
App({
  onShow: function() {
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
                    wx.getUserInfo({
                      withCredentials: false,
                      lang: "zh_CN",
                      success: res => {
                        this.globalData.hasAuth = true;
                        console.log("getUserInfo", res)
                        this.globalData.userInfo.name = res.userInfo.nickName;
                        this.globalData.userInfo.avatar = res.userInfo.avatarUrl;
                        wx.setStorageSync("userInfo", this.globalData.userInfo);
                        wx.request({
                          url: this.globalData.url + "/user",
                          method: "POST",
                          data: this.globalData.userInfo
                        })
                      }
                    })
                  }
                }
              })
            },
            fail() {
              wx.request({
                url: this.globalData.url + "/errors",
                method: "POST",
                data: { msg: "接口请求失败" }
              })
            }
          })

        } else {
          wx.request({
            url: this.globalData.url + "/errors",
            method: "POST",
            data: {msg: "没有code"}
          })
        }
      },
      fail() {
        wx.request({
          url: this.globalData.url + "/errors",
          method: "POST",
          data: { msg: "最外层错误" }
        })
      }
    });
  },
  onError(e) {
    console.error(e);
  },
  globalData: {
    userInfo: "",
    url: "https://wedding.allschoolthings.com",
    online: "https://wedding.allschoolthings.com",
    dev: "http://localhost:2222",
    hasAuth: false
  }
});