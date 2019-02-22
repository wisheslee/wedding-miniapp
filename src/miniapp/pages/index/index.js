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
    imageList: ["",
      "",
      "",
      "",
      "",
      "",
    ],
    textList: [
      "",
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
    wx.showShareMenu();
    console.log("options", options);
    this.getUserInfo(options);
  },
  onShow() {
    this.getCompleteUser();
  },
  getUserInfo(options) {
    if (!wx.getStorageSync("userInfo")) {
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
              this.setData({
                userInfo: res.data.data
              });
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
    wx.request({
      url: app.globalData.url + '/user?openid=' + this.data.userInfo.openid,
      method: "get",
      success: (res) => {
        wx.setStorageSync("userInfo", res.data.data);
        app.globalData.userInfo = res.data.data;
        this.setData({
          userInfo: res.data.data
        });
        this.handleTaskList(res.data.data.taskList);
        this.handleOptions(options);
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  handleTaskList(taskList) {
    taskList.forEach(task => {
      task.img = this.data.imageList[task.taskId - 1];
    });
    this.setData({
      taskList: taskList
    });
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
    wx.request({
      url: app.globalData.url + "/update_lock_status",
      method: "POST",
      data: {
        openid: app.globalData.userInfo.openid,
        taskId: taskId,
      },
      success: res => {
        this.getTaskList();
        wx.showToast({
          title: "解锁新任务！"
        })
      },
      complete() {
        wx.hideLoading();
      }
    })
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
            user.taskStrTime = moment(user.taskUpdateTime).format("MMDD HH:mm");
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
    if (this.data.userInfo.completeStatus === 0) {
      wx.showToast({
        title: '集齐6张照片才能兑奖哦',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `确认兑换${category}吗？`,
        success: res => {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
            });
            let user = this.data.userInfo;
            user.reward = category;
            wx.request({
              url: app.globalData.url + "/update_reward_status",
              method: "POST",
              data: user,
              success: (res) => {
                if (res.data.status === 200) {
                  wx.showToast({
                    title: '找新郎兑现',
                    icon: "success",
                    duration: 2000
                  });
                  setTimeout(() => {
                    this.updateUserInfo(this.data.userInfo.openid, {});
                    this.getCompleteUser()
                  }, 2000);

                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: "none",
                    duration: 4000
                  });
                }
              },
              fail() {
                wx.showToast({
                  title: "请重试",
                  duration: 2000
                });
              },
              complete() {
                wx.hideLoading();
              }
            })
          }
        }
      })
    }
  },
  preview() {
    wx.previewImage({
      urls: [this.data.memoryImage] // 需要预览的图片http链接列表
    })
  }
});
