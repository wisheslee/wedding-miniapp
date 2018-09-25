//index.js
//获取应用实例
const app = getApp();
const moment = require("../../resouces/moment.js")
Page({
  data: {
    userInfo: "",
    memoryTextVisible: false,
    memoryText: "",
    memoryImage: "",
    completeList: [],
    taskList: [],
    imageList: ["https://liji-image-hangzhou.oss-cn-hangzhou.aliyuncs.com/image0.JPG?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
      "https://liji-image-hangzhou.oss-cn-hangzhou.aliyuncs.com/image1.JPG?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
      "https://liji-image-hangzhou.oss-cn-hangzhou.aliyuncs.com/image2.jpeg?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
      "https://liji-image-hangzhou.oss-cn-hangzhou.aliyuncs.com/image3.jpeg?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
      "https://liji-image-hangzhou.oss-cn-hangzhou.aliyuncs.com/image4.JPG?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
      "https://liji-image-hangzhou.oss-cn-hangzhou.aliyuncs.com/image5.JPG?x-oss-process=image/resize,l_1080/quality,Q_50/auto-orient,1",
    ],
    textList: [
      "2016年9月13日，是我们两个月前约定的领证日期，我们买了新衣服、精心打扮了一番，专门到川大拍了结婚证照。当我们悠闲的到锦江区准备领证时，发现我们都忘带身份证！于是急忙赶回家拿了身份证，飞奔到金牛区民政局赶在工作人员下班之前领到了我们的红本本，开心~",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  onLoad: function (options) {
    //更新完成列表。todo socket消息
    //更新用户信息，获取最新的完成状态
    console.log("options", options);
    this.getUserInfo(options);
  },
  getUserInfo(options) {
    if(!wx.getStorageSync("userInfo")) {
      this.login(options);
    } else {
      this.setData({
        userInfo: wx.getStorageSync("userInfo")
      });
      this.updateUserInfo(this.data.userInfo.openid, options);
    }
  },
  login(options) {
    wx.showLoading({
      title: "加载中"
    });
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: app.globalData.url + '/login',
            method: "POST",
            data: {
              code: res.code
            },
            success: (res) => {
              wx.setStorageSync("userInfo", res.data.data);
              app.globalData.userInfo = res.data.data;
              this.data.userInfo = res.data.data;
              this.handleTaskList(res.data.data.taskList);
              this.handleOptions(options);
            }
          })
        }
      },
      complete() {
        wx.hideLoading();
      }
    });
  },
  updateUserInfo(openid, options) {
    wx.showLoading({
      title: "加载中"
    });
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: app.globalData.url + '/user?openid=' + this.data.userInfo.openid,
            method: "get",
            success: (res) => {
              wx.setStorageSync("userInfo", res.data.data);
              app.globalData.userInfo = res.data.data;
              this.data.userInfo = res.data.data;
              this.handleTaskList(res.data.data.taskList);
              this.handleOptions(options);
            }
          })
        }
      },
      complete() {
        wx.hideLoading();
      }
    });
  },
  handleTaskList(taskList) {
    taskList.forEach(task => {
      task.img = this.data.imageList[task.taskId - 1];
    });
    this.setData({
      taskList: taskList
    });
  },
  onShow() {
    //每次返回都需要拉取，
    if (app.globalData.userInfo.openid) {
      this.getTaskList();
    }
    this.getCompleteUser();
  },
  click(event) {
    const taskId = event.currentTarget.dataset.taskid;
    const lockStatus = event.currentTarget.dataset.lockstatus;
    if (lockStatus == 1) {
      wx.showToast({
        title: '请先扫对应二维码',
        icon: "none",
        duration: 2000
      })
      return;
    }

    if (lockStatus == 0) {
      wx.navigateTo({
        url: `/pages/task${taskId}/task${taskId}`,
      })
    }
  },
  handleOptions(options) {
    if (options.taskId) {
      this.updateLockStatus(options.taskId);
    }
  },
  updateLockStatus(taskId) {
    wx.showLoading({
      title: '加载中',
    });
    const timer = setInterval(() => {
      if (app.globalData.userInfo.openid) {
        clearInterval(timer);
        wx.request({
          url: app.globalData.url + "/update_lock_status",
          method: "POST",
          data: {
            openid: app.globalData.userInfo.openid,
            taskId: taskId,
          },
          success: res => {
            this.getTaskList();
          },
          complete() {
            wx.hideLoading();
          }
        })
      }
    }, 50);
  },
  showMemory(event) {
    const index = event.currentTarget.dataset.index;
    this.setData({
      memoryTextVisible: true,
      memoryText: this.data.textList[index],
      memoryImage: this.data.imageList[index]
    })
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
        if (res.data.data) {
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
      success: res => {
        if (res.data.data && res.data.data.length) {
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
    if (this.data.userInfo.completeStatus === 0) {
      wx.showToast({
        title: '集齐6张照片才能兑奖哦',
        icon: 'none',
        duration: 2000
      })
    }
  },
  preview() {
    wx.previewImage({
      urls: [this.data.memoryImage] // 需要预览的图片http链接列表
    })
  }
});
