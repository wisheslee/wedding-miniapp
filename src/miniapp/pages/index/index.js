//index.js
//获取应用实例
const app = getApp();
const moment = require("../../resouces/moment.js")
Page({
  data: {
    userInfo: "",
    memoryTextVisible: false,
    memoryText: "",
    completeList: [],
    taskList:[],
    imageList: ["https://liji-image.oss-cn-hongkong.aliyuncs.com/image0.JPG?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image1.JPG?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image2.jpeg?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image3.jpeg?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image4.JPG?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
      "https://liji-image.oss-cn-hongkong.aliyuncs.com/image5.JPG?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
]
  },
  onLoad: function () {
    wx.showLoading({
      title: "加载中"
    });
    const timer = setInterval(() => {
      if(app.globalData.userInfo) {
        let taskList = JSON.parse(JSON.stringify(app.globalData.userInfo.taskList));
        taskList.forEach(task => {
          task.img = this.data.imageList[task.taskId - 1];
        })
        this.setData({
          userInfo: app.globalData.userInfo,
          taskList: taskList
        });
        clearInterval(timer);
        wx.hideLoading();
      }
    },50);
  },
  onShow() {
    if(app.globalData.userInfo.openid) {
      this.getTaskList();
    }
    this.getCompleteUser();
  },
  click(event) {
    const index = event.currentTarget.dataset.index;
    switch(index){
      case 0:
        wx.navigateTo({
          url: '/pages/task1/task1',
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
  showMemory(event) {
    const index = event.currentTarget.dataset.index;
    if(index === 0) {
      this.setData({
        memoryTextVisible: true,
        memoryText: "2016年9月13日，是我们两个月前约定的领证日期，我们买了新衣服、精心打扮了一番，专门到川大拍了结婚证照。当我们悠闲的到锦江区准备领证时，发现我们都忘带身份证！于是急忙赶回家拿了身份证，飞奔到金牛区民政局赶在工作人员下班之前领到了我们的红本本，开心~"
      })
    }
  },
  closeMemoryText() {
    this.setData({
      memoryTextVisible: false
    })
  },
  getCompleteUser() {
    wx.request({
      url: app.globalData.url + "/complete_list",
      success: (res) => {
        if(res.data.data) {
          res.data.data.forEach(user => {
            user.taskStrTime = moment(user.taskUpdateTime).format("YYYYMMDD HH:mm");
          })
          this.setData({
            completeList: res.data.data
          })
        }
      }
    })
  },
  getTaskList() {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + "/get_task_list",
      method: "POST",
      data: {
        openid: app.globalData.userInfo.openid
      },
      success: res =>{
        if(res.data.data) {
          res.data.data.forEach(task => {
            task.img = this.data.imageList[task.taskId - 1];
          })
          this.setData({
            taskList: res.data.data
          });
        }   
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  getReward(event) {
    const category = event.currentTarget.dataset.category;
    console.log(category)
    if(this.data.userInfo.completeStatus === 0) {
      wx.showToast({
        title: '集齐6张照片才能兑奖哦',
        icon: 'none',
        duration: 2000
      })
    }
  }
});
