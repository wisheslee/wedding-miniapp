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
        console.log(res)
        this.globalData.userInfo.name = res.userInfo.nickName;
        this.globalData.userInfo.avatar = res.userInfo.avatarUrl;
        wx.setStorageSync("userInfo", this.globalData.userInfo);
        wx.request({
          url: this.globalData.url + "/user",
          method: "POST",
          data: this.globalData.userInfo
        })
        wx.navigateTo({
          url: '/pages/index/index',
        })
      }
    })
  }
})