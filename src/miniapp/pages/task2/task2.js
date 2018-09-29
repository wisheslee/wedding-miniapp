import util from "../../utils/util";

let ctx;
let canvasW = 375;
let canvasH = 375;
const master = "../../resouces/girl.png";
const mSize = [60, 60];
let mPosition = [0, 0];
const mDistance = 10;
const slave = "../../resouces/boy.png";
const sSize = [60, 60];
let sPosition = [0, 315];
const works = ["../../resouces/cloth1.jpeg", "../../resouces/cloth2.jpeg", "../../resouces/cloth3.jpeg"];
const wSize = [60, 60];
//产生work的坐标
let wNodes = [20, 150, 270];
let wPositions = [];
//是否按住了slave
let hasTouch = false;
let timer;
let canvasTimer;
let totalTime = 25;
Page({
  data: {
    //分数
    score: 0,
    total: 22,
    //倒计时
    time: totalTime,
  },
  onReady: function () {
    this.init();
  },
  onHide() {
    clearInterval(timer);
    clearInterval(canvasTimer);
  },
  onUnload() {
    clearInterval(timer);
    clearInterval(canvasTimer);
  },
  init() {
    clearInterval(canvasTimer);
    clearInterval(timer);
    this.setData({
      time: totalTime,
      score: 0
    });
    ctx = wx.createCanvasContext("task2");
    ctx.drawImage(master, 0, 0, ...mSize);
    ctx.drawImage(slave, 0, 315, ...sSize);
    ctx.draw();
    canvasTimer = setInterval(() => {
      this.drawFrame();
    }, 90);
    timer = setInterval(() => {
      if (this.data.time > 0) {
        this.setData({
          time: --this.data.time
        });
      } else {
        clearInterval(canvasTimer);
        clearInterval(timer);
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
  drawFrame() {
    //移动master
    this.moveMaster();
    //移动work
    this.moveWorks();
    //slave移动由事件驱动，这里不管
    //检测碰撞
    this.crashDetection();
    //先清除
    ctx.clearRect(0, 0, 375, 375);
    //根据坐标数据，渲染master，slave，works
    //master
    ctx.drawImage(master, ...mPosition, ...mSize);
    //slave
    ctx.drawImage(slave, ...sPosition, ...sSize);
    //works
    wPositions.forEach((w, i) => {
      let index = wNodes.indexOf(w[0]);
      if (index === -1) {
        index = 0;
      }
      ctx.drawImage(works[index], ...w, ...wSize);
    });
    ctx.draw();
    //再画
  },
  moveMaster() {
    //移动，更新mPosition
    mPosition[0] = mPosition[0] + mDistance > canvasW - mSize[0] ? 0 : mPosition[0] + mDistance;
    if (wNodes.indexOf(mPosition[0]) !== -1) {
      this.genWork(mPosition[0]);
    }
  },
  moveWorks() {
    wPositions.forEach(w => {
      w[1] += 10;
    })
  },
  genWork(position) {
    //生成work的坐标，统一到drawFrame里渲染
    let flag = wPositions.find(item => item[0] === position);
    if (flag) {
      //如果该位置存在一个work，则不重复产生
      return;
    }
    wPositions.push([position, mSize[1]]);
  },
  moveSlave() {
    //slave移动
  },
  crashDetection() {

    let slaveLeft = sPosition;
    let slaveRight = [sPosition[0] + sSize[0], sPosition[1]];
    for (let i = 0; i < wPositions.length; i++) {
      //其中一个work的position
      let position = wPositions[i];
      //检测碰撞
      //因为work比slave小，所以判断work的左右点有没和slave相交；
      //work左
      let aCondition = position[0] <= slaveLeft[0] && slaveLeft[0] <= (position[0] + wSize[0]);
      let bCondition = position[1] <= slaveLeft[1] && slaveLeft[1] <= position[1] + +wSize[1];
      //work右
      let cCondition = position[0] <= slaveRight[0] && slaveRight[0] <= (position[0] + wSize[0]);
      let dCondition = position[1] <= slaveRight[1] && slaveRight[1] <= position[1] + +wSize[1];
      if ((aCondition && bCondition) || (cCondition && dCondition)) {
        wPositions.splice(i, 1);
        this.setData({
          score: this.data.score + 1
        });
        if (this.data.score >= this.data.total) {
          clearInterval(canvasTimer);
          clearInterval(timer);
          util.completeTask(2);
          break;
        }
        continue;
      }
      //检测越界
      if (position[1] > canvasH) {
        wPositions.splice(i, 1);
      }
    }
  },
  handleTouchstart(e) {
    let touch = e.touches[0];
    if (!touch) {
      return;
    }
    //判断是否按住了slave
    let xCondition = sPosition[0] <= touch.x && touch.x <= sPosition[0] + sSize[0];
    let yCondition = sPosition[1] <= touch.y && touch.y <= sPosition[1] + sSize[1];
    if (xCondition && yCondition) {
      hasTouch = true;
    }
  },
  handleTouchmove(e) {
    if (!hasTouch) {
      return;
    }
    let touch = e.touches[0];
    if (!touch) {
      return;
    }
    let x = touch.x - sSize[0] / 2;
    if (x <= 0) {
      x = 0;
    }
    if (x >= (canvasW - sSize[0] / 2)) {
      x = canvasW - sSize[0] / 2
    }
    sPosition[0] = x;

  },
  handleTouchend() {
    if (hasTouch) {
      hasTouch = false;
    }
  },
});