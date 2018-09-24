const app = getApp();
export default {
  checkAuth() {
    if (!app.globalData.hasAuth) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    } else {
      wx.redirectTo({
        url: '/pages/index/index',
      });
      if (!app.globalData.userInfo.name) {
        wx.getUserInfo({
          withCredentials: false,
          lang: "zh_CN",
          success: res => {
            console.log("getUserInfo", res);
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
  },
  //碰撞算法
  collisionAlgorithm(position1, size1, position2, size2) {

  }
}

