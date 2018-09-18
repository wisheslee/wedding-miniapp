// pages/auth/auth.js
const app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {},
  bindGetUserInfo() {
    wx.getUserInfo({
      withCredentials: false,
      lang: "zh_CN",
      success: res => {
        app.globalData.hasAuth = true;
        console.log("getUserInfo", res)
        app.globalData.userInfo.name = res.userInfo.nickName;
        app.globalData.userInfo.avatar = res.userInfo.avatarUrl;
        wx.setStorageSync("userInfo", app.globalData.userInfo);
        wx.request({
          url: app.globalData.url + "/user",
          method: "POST",
          data: app.globalData.userInfo
        })
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }
    })
  }
})