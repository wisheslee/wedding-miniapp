// pages/task4/task4.js
Page({
  data: {
    list: [],
    positions: [],
    queue: [],
  },
  onLoad() {
    let arr = [];
    for(let i = 0; i < 9; i++) {
      let arr1 = []
      for(let j = 0; j < 16; j++) {
        arr1.push(1)
      }
      arr.push(arr1)
    }
    this.setData({
      list: arr
    })
  },
  onReady() {
    wx.createSelectorQuery().selectAll(".touch-item").fields({
      dataset: true,
      rect: true,
    }, res => {
      res  = res ? res : [];
      this.setData({
        positions: res
      })
    }).exec();
    this.detect();
  },
  erase(e) {
    this.data.queue.push(e);
  },
  detect() {
    //记得销毁
    setInterval(() => {
      if (this.data.queue.length) {
        this.handleEvent();
      }
    }, 100)
  },
  handleEvent() {
    if (!this.data.queue.length) {
      return;
    }
    let e = this.data.queue.splice(0, 1)[0];
    this.handleErase(e);
    if (this.data.queue.length) {
      this.handleEvent();
    }
  },
  handleErase(e) {
    let touch = e.touches[0];
    if(!touch) {
      return;
    }
    let x = touch.pageX;
    let y = touch.pageY + 50;
    console.log(111, x, y, e);
    let positions = this.data.positions;
    for(let i = 0; i < positions.length; i++) {
      let position = positions[i];
      console.log("left, right, top, bottom", position.left, position.right, position.top, position.bottom);
      if(position.left < x && x < position.right && position.top < y && y <position.bottom) {
        console.log(222, position);
        let indexes = position.dataset.index;
        if (!indexes) {
          break;
        }
        indexes = indexes.split("-");
        if ((!indexes instanceof Array) || indexes.length !== 2) {
          break;
        }
        let list = this.data.list;
        list[indexes[0]][indexes[1]] = 0;
        this.setData({
          list: list
        });
      }
    }
  },
  erase1(e) {
    console.log(e);
  }
})