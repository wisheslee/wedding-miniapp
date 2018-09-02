const getUserInfoAuth = function() {
  wx.getUserInfo({
    withCredentials: false,
    lang: "zh_CN",
    success: res => {
      app.globalData.hasAuth = true;
      console.log(res)
      app.globalData.userInfo.name = res.userInfo.nickName;
      app.globalData.userInfo.avatar = res.userInfo.avatarUrl;
      wx.setStorageSync("userInfo", app.globalData.userInfo);
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.url + "/user",
        method: "POST",
        data: app.globalData.userInfo,
        success: () => {
          wx.navigateTo({
            url: '/pages/index/index',
          })
        },
        complete() {
          wx.hideLoading();
        }
      })
      
    }
  })
}
