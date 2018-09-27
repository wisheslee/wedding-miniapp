import util from '../../utils/util'
const app = getApp();
Page({
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  formSubmit(event) {
    const words = event.detail.value.answer;
    wx.request({
      url: app.globalData.url + "/words",
      method: "POST",
      data: {
        openid: app.globalData.userInfo.openid,
        words
      }
    });
    util.completeTask(6);
  }
});