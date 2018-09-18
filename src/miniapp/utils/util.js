export default {
  checkAuth() {
    if (!app.globalData.hasAuth) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    } else {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  }
}

