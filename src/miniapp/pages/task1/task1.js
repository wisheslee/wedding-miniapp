// pages/task1/task1.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/index';
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
  formSubmit(event) {
    const value = event.detail.value;
    if(value.husband === "杨成阳" && value.wife === "陈芊" && value.area === "今日东坡") {
      wx.showToast({
        title: '加载中',
      })

      wx.request({
        url: app.globalData.url + "/update_task_status",
        method: "POST",
        data: {
          openid: app.globalData.userInfo.openid,
          taskId: 1
        },
        success() {
          wx.hideToast();
          wx.showToast({
            title: '恭喜集得一张照片，点击查看故事',
            icon: 'none',
            duration: 2000,
          })
          setTimeout(() => {
            if (!app.globalData.hasAuth) {
              wx.navigateTo({
                url: '/pages/auth/auth',
              })
            } else {
                wx.navigateBack({
                  delta: 1
                })
            }
          }, 1000)
        }
      })
    } else {
      wx.showToast({
        title: '回答错误',
        icon: 'none',
        duration: 2000
      })
    }
  }
})