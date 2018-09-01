//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
       if(res.code) {

         wx.request({
           url:this.globalData.url + '/login',
           method: "POST",
           data: {
             code: res.code
           },
           success(res) {
              console.log(res.data)
           }
         })
       }
      }
    });  
  },
  globalData: {
    userInfo: null,
    url: "http://localhost:2222",
    backup: "https://wedding.allschoolthings.com"
  }
});