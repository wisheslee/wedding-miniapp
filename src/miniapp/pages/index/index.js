//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: "",
    task1QuestionVisible: false,
    memoryTextVisible: false,
    memoryText: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageList: ["/img/01.jpeg", "/img/02.jpeg", "/img/03.jpeg", "/img/04.jpeg", "/img/05.jpeg", "/img/06.jpeg"]
  },
  onLoad: function () {
    wx.showLoading();
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
  click(event) {
    const index = event.currentTarget.dataset.index;
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
