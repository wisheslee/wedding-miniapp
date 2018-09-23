// pages/task4/task4.js
let ctx, radius = 16, x = 0, y = 0, width = 375, height = 375, distance = 1;
Page({
  data: {
    list: [],
    positions: [],
    queue: [],
  },
  onReady() {
    ctx = wx.createCanvasContext("task4");
    // ctx.globalCompositeOperation = "destination-out";
    // ctx.drawImage("../../resouces/dish.png", 0, 0, 375, 375);
    ctx.drawImage("../../resouces/dirty.png", 70, 70, 70, 70);
    ctx.drawImage("../../resouces/dirty.png", 270, 90, 80, 80);
    ctx.drawImage("../../resouces/dirty.png", 60, 240, 100, 100);
    ctx.drawImage("../../resouces/dirty.png", 185, 185, 120, 120);
    ctx.drawImage("../../resouces/dirty.png", 160, 100, 110, 110);
    ctx.drawImage("../../resouces/dirty.png", 80, 160, 90, 90);
    ctx.draw();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = radius * 2;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    // ctx.globalCompositeOperation = "destination-out";
  },
  startHandler(e) {
    let c = this.getCoordinate(e);
    ctx.save();
    ctx.beginPath();
    console.log(c);
    ctx.arc(c.x, c.y, radius, 0, 2 * Math.PI);
    ctx.clip();
    ctx.clearRect(0, 0, width, height);
    ctx.draw(true);
    ctx.restore();
    x = c.x;
    y = c.y;
  },
  moveHandler(e) {
    let c = this.getCoordinate(e);
    let x2 = c.x;
    let y2 = c.y;
    let x1 = x;
    let y1 = y;

    var asin = radius * Math.sin(Math.atan((y2 - y1) / (x2 - x1)));
    var acos = radius * Math.cos(Math.atan((y2 - y1) / (x2 - x1)));
    var x3 = x1 + asin;
    var y3 = y1 - acos;
    var x4 = x1 - asin;
    var y4 = y1 + acos;
    var x5 = x2 + asin;
    var y5 = y2 - acos;
    var x6 = x2 - asin;
    var y6 = y2 + acos;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x2, y2, radius, 0, 2 * Math.PI);
    ctx.clip();
    ctx.clearRect(0, 0, width, height);
    ctx.draw(true);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x3, y3);
    ctx.lineTo(x5, y5);
    ctx.lineTo(x6, y6);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.clip();
    ctx.clearRect(0, 0, width, height);
    ctx.draw(true);
    ctx.restore();

    x = x2;
    y = y2;
  },
  endHandler(e) {
    wx.canvasGetImageData({
      canvasId: 'task4',
      x: 0,
      y: 0,
      width: width,
      height: height,
      success(imgData) {
        let flag = imgData.data.find(item => item ===1);
        console.log(flag);
      }
    })

  },
  getCoordinate(e) {
    let touch = e.touches[0];
    return {
      x: touch ? touch.x : 0,
      y: touch ? touch.y : 0,
    }
  },
  drawLine(x1, y1, x2, y2) {
    x = x1;
    y = y1;
    ctx.save();
    ctx.beginPath();
    if (arguments.length === 2) {
      ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.fill();
      x = x2;
      y = y2;
    }
    ctx.draw(true);
    ctx.restore();
  }
})