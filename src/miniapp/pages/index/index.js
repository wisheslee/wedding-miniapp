//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: "",
    task1QuestionVisible: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageList: ["/img/01.jpeg", "/img/02.jpeg", "/img/03.jpeg", "/img/04.jpeg", "/img/05.jpeg", "/img/06.jpeg"]
  },
  onLoad: function () {
    wx.showLoading();
    const timer = setInterval(() => {
      if(app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo
        });
        clearInterval(timer);
        wx.hideLoading();
      }
    },50);
  },
  click(event) {
    const index = event.currentTarget.dataset.index;
    console.log(111, index)
    switch(index){
      case 0:
        console.log(222)
        this.setData({
          task1QuestionVisible: true
        })
        break;
      default:
        wx.showToast({
          title: '请先扫对应二维码',
          icon: "none",
          duration: 2000
        })
    }
  },
});
