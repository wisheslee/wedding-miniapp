// pages/auth/auth.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
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
        wx.navigateTo({
          url: '/pages/index/index',
        })
      }
    })
  }
})