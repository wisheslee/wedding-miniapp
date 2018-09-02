//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: "",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bgImage: "https://liji-image.oss-cn-hongkong.aliyuncs.com/backgroundImage.jpg?x-oss-process=image/quality,Q_50/auto-orient,1",
    imageList: [
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image0.JPG?x-oss-process=image/quality,Q_50/auto-orient,1",
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image1.JPG?x-oss-process=image/quality,Q_50/auto-orient,1",
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image2.JPG?x-oss-process=image/quality,Q_50/auto-orient,1",
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image3.JPG?x-oss-process=image/quality,Q_50/auto-orient,1",
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image4.JPG?x-oss-process=image/quality,Q_50/auto-orient,1",
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image5.JPG?x-oss-process=image/quality,Q_50/auto-orient,1",
    ]
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
  click() {

  },
});
