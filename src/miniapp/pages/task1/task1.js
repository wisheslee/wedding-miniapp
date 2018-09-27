import util from '../../utils/util'
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
    if (value.husband === "杨成阳" && value.wife === "陈芊") {
      util.completeTask(1);
    } else {
      wx.showToast({
        title: '回答错误',
        icon: 'none',
        duration: 2000
      })
    }
  }
})