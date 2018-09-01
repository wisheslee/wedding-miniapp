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
    url: "https://wedding.allschoolthings.com",
    backup: "https://wedding.allschoolthings.com"
  }
});