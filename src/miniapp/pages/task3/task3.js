import util from "../../utils/util";

let ctx;
let canvasW = 375;
let canvasH = 375;

//图片
const peopleSize = [50, 50];
const objectSize = [50, 50];
const slave = "../../resouces/boy.png";
let sPosition = [0, canvasH - peopleSize[1]];
const master = "../../resouces/girl.png";
let mPosition = [canvasW - peopleSize[0], 0];
const bathtub = "../../resouces/bathtub.png";
let bathtubPos = [250, 0];
const bench = "../../resouces/bench.png";
let benchPos = [0, 50];
const chair = "../../resouces/chair.png";
let chairPos = [0, 0];
const chest = "../../resouces/chest.png";
let chestPos = [170, 0];
const desk = "../../resouces/desk.png";
let deskPos = [150, 150];
const light = "../../resouces/light.png";
let lightPos = [70, 325];
const sofa = "../../resouces/sofa.png";
let sofaPos = [150, 90];
const dog1 = "../../resouces/dog1.png";
let dog1Pos = [325, 120];
const dog2 = "../../resouces/dog2.png";
let dog2Pos = [270, 300];
const tv = "../../resouces/tv.png";
let tvPos = [150, 200];
const clock = "../../resouces/clock.png";
let clockPos = [0, 170];
const things = [bathtub, bench, chair, chest, desk, light, sofa, dog1, dog2, tv, clock];
let thingsPos = [bathtubPos, benchPos, chairPos, chestPos, deskPos, lightPos, sofaPos, dog1Pos, dog2Pos, tvPos, clockPos];


//是否按住了slave
let hasTouch = false;
let timer;
let canvasTimer;
let totalTime = 25;
let success = false;
Page({
  data: {
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
  init() {
    success = false;
    clearInterval(canvasTimer);
    clearInterval(timer);
    this.setData({
      time: totalTime,
    });
    sPosition = [0, canvasH - peopleSize[1]];
    ctx = wx.createCanvasContext("task3");
    canvasTimer = setInterval(() => {
      if (!success) {
        this.drawFrame();
      }
    }, 90);
    timer = setInterval(() => {
      if (this.data.time > 0) {
        this.setData({
          time: --this.data.time
        });
      } else {
        this.fail();
      }
    }, 1000)
  },
  drawFrame() {
    //检测碰撞
    this.crashDetection();
    this.successDetection();
    //先清除
    ctx.clearRect(0, 0, 375, 375);
    //画静物
    this.drawThings();
    //画slave
    ctx.drawImage(slave, ...sPosition, ...peopleSize);
    ctx.draw();
  },
  drawThings() {
    ctx.drawImage(master, ...mPosition, ...peopleSize);
    things.forEach((thing, index) => {
      ctx.drawImage(thing, ...thingsPos[index], ...objectSize);
    });
  },
  fail() {
    clearInterval(canvasTimer);
    clearInterval(timer);
    wx.showModal({
      title: 'ycy把小芊吵醒了',
      content: '是否重来？',
      success: res => {
        if (res.confirm) {
          this.init();
        }
      }
    })
  },
  crashDetection() {
    let leftTop = [...sPosition];
    let leftBottom = [sPosition[0], sPosition[1] + peopleSize[1]];
    let rightTop = [sPosition[0] + peopleSize[0], sPosition[1]];
    let rightBottom = [sPosition[0] + peopleSize[0], sPosition[1] + peopleSize[1]];
    for (let i = 0; i < thingsPos.length; i++) {
      //其中一个work的position
      let position = thingsPos[i];
      //检测碰撞
      //因为work比slave小，所以判断work的左右点有没和slave相交；
      //leftTop
      let aCondition = position[0] <= leftTop[0] && leftTop[0] <= (position[0] + objectSize[0]);
      let bCondition = position[1] <= leftTop[1] && leftTop[1] <= position[1] + +objectSize[1];
      //rightTop
      let cCondition = position[0] <= rightTop[0] && rightTop[0] <= (position[0] + objectSize[0]);
      let dCondition = position[1] <= rightTop[1] && rightTop[1] <= position[1] + +objectSize[1];
      //leftBottom
      let eCondition = position[0] <= leftBottom[0] && leftBottom[0] <= (position[0] + objectSize[0]);
      let fCondition = position[1] <= leftBottom[1] && leftBottom[1] <= position[1] + +objectSize[1];
      //rightBottom
      let gCondition = position[0] <= rightBottom[0] && rightBottom[0] <= (position[0] + objectSize[0]);
      let hCondition = position[1] <= rightBottom[1] && rightBottom[1] <= position[1] + +objectSize[1];
      if ((aCondition && bCondition) || (cCondition && dCondition)
        || (eCondition && fCondition) || (gCondition && hCondition)) {
        this.fail();
        return;
      }
    }
  },
  successDetection() {
    if (sPosition[0] === mPosition[0] && sPosition[1] === mPosition[1]) {
      success = true;
      clearInterval(canvasTimer);
      clearInterval(timer);
      util.completeTask(3);
    }
  },
  handleTouchstart(e) {
    let touch = e.touches[0];
    if (!touch) {
      return;
    }
    //判断是否按住了slave
    let xCondition = sPosition[0] <= touch.x && touch.x <= sPosition[0] + peopleSize[0];
    let yCondition = sPosition[1] <= touch.y && touch.y <= sPosition[1] + peopleSize[1];
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
    let x = touch.x - peopleSize[0] / 2;
    let y = touch.y - peopleSize[1] / 2;
    if (x <= 0) {
      x = 0;
    }
    if (y <= 0) {
      y = 0;
    }
    if (x >= (canvasW - peopleSize[0])) {
      x = canvasW - peopleSize[0];
    }
    if (y >= (canvasH - peopleSize[1])) {
      y = canvasH - peopleSize[1];
    }
    sPosition[0] = x;
    sPosition[1] = y;
  },
  handleTouchend() {
    if (hasTouch) {
      hasTouch = false;
    }
  },
});