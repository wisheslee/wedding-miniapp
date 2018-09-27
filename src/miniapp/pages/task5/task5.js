import util from "../../utils/util";

let totalTime = 10, timer;
Page({
  data: {
    time: 10,
    total: 20,
    score: 0,
  },
  onReady: function () {
    this.init();
  },
  onHide: function () {
    clearInterval(timer)
  },
  init() {
    clearInterval(timer)
    this.setData({
      time: 10,
      score: 0,
    });
    timer = setInterval(() => {
      if (this.data.time > 0) {
        this.setData({
          time: --this.data.time
        });
      } else {
        clearInterval(timer)
        wx.showModal({
          title: '任务失败',
          content: '是否重来？',
          success: res => {
            if (res.confirm) {
              this.init();
            }
          }
        })
      }
    }, 1000)
  },
  sorry() {
    if (this.data.score < this.data.total) {
      this.setData({
        score: ++this.data.score
      });
    } else {
      clearInterval(timer);
      util.completeTask(5);
    }

  }
});