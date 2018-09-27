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
            app.globalData.userInfo.name = res.userInfo.nickName;
            app.globalData.userInfo.avatar = res.userInfo.avatarUrl;
            wx.request({
              url: app.globalData.url + "/user",
              method: "POST",
              data: app.globalData.userInfo
            })
          }
        })
      }
    }
  },
  //碰撞算法
  collisionAlgorithm(position1, size1, position2, size2) {

  },
  completeTask(taskId) {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.url + "/update_task_status",
      method: "POST",
      data: {
        openid: app.globalData.userInfo.openid,
        taskId: taskId
      },
      success:() => {
        wx.hideLoading();
        wx.showToast({
          title: '恭喜集得一张照片，点击查看故事',
          icon: 'none',
          duration: 2000,
        })
        setTimeout(() => {
          this.checkAuth();
        }, 2000)
      }
    })
  }
}

