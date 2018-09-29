import util from '../../utils/util'
const app = getApp();
Page({
  data: {

  },
  formSubmit(event) {
    const answer = event.detail.value.answer;
    const wish = event.detail.value.wish;
    if (answer == 2018) {
      wx.request({
        url: app.globalData.url + "/words",
        method: "POST",
        data: {
          openid: app.globalData.userInfo.openid,
          words: wish
        }
      });
      util.completeTask(6);
    } else {
      wx.showModal({
        content: "回答错啦",
        success: res => {
        }
      })
    }
  }
});