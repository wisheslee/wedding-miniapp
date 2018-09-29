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
      "2017年9月，我们在三亚度蜜月，那是我们俩一起第一次见到大海，我们基本每天晚上都会漫步海滩，面对磅礴的大海，我们显得如此的渺小，但我们对彼此的爱却那么满占据了我们全部的内心，不管在哪里，只要有你就好。",
      "2014年9月，我们和一群朋友到天台山游玩，这只是我们很多时光里面平凡的一天，也是我们很多次旅行里面普通的一次，但这一切，组成了我们快乐的回忆，我们没有轰轰烈烈荡气回肠的心路历程，有的只是这样平凡简单的生活。",
      "2013年2月，那年我们还在异地恋，寒假我们才终于有时间可以多陪伴彼此，我们约上了朋友一起到西安游玩，在城墙上好友抓拍了我们搞怪的一瞬间。每次再看到这张照片，我们都忍不住大笑，就如同那年那天",
      "2012年11月，我们一起到上海观看星际争霸2BWC比赛，这是我们的第一次旅行，我们走过了许多陌生的接到，吃了很多新奇的食物，当时的我们还在熟悉和适应彼此，就像一场未知的旅行，明明才刚启程，却感觉兴奋和快乐到了云端。",
      "2015年的春节，我们去了丽江和大理，我们走过了商业气息浓厚的丽江古镇，也领略了刚刚开发的大理才村，也许这不是一场完美的旅行，但只要是有彼此的回忆，我们都会珍藏。"
    ]
  },
  onLoad: function (options) {
    //更新完成列表。todo socket消息
    //更新用户信息，获取最新的完成状态
    wx.showShareMenu();
    console.log("options", options);
    this.getUserInfo(options);
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
  onShow() {
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
