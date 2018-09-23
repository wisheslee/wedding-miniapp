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
  },
  //碰撞算法
  collisionAlgorithm(position1, size1, position2, size2) {

  }
}

