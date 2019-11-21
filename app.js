//app.js
App({
  data: {
    urls:'http://192.168.0.205:10007',
    productJumpDetails:{},
    address: [{
      id: 0,
      name: "张辉",
      page: "18618170615",
      dizhi: ['北京市', '北京市', '通州区'],
      details: "土桥 华远好天地 A座 506"
    }],
    xiugaiAddress: {},
    zhuangtais:'个人'
  },
  onLaunch: function () {
    let that = this
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.statusBarHeight = res.statusBarHeight
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    if (logs){
      wx.checkSession({
        success:function(e){
          // console.log(e)
        },
        fail:function(){
          // doLogin()
        }
      })
    } else {
      // doLogin()
    }
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var code = res.code; //返回code
        var appId = 'wx2d41baa4097e98ef'
        var secret = '2c7240467df04b00746ee394510f7cf4';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          method:'get',
          data: {
            appid: appId,
            secret: secret,
            js_code: code,
            grant_type: 'authorization_code'
          },
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
            // console.log(res.data)
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              // wx.switchTab({
              //   url: '../../homePage/index',
              // })
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  },
  globalData: {
    URL: 'http://192.168.0.205:10007/EKCmVlbPGU.php'
  },

  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: url,
      method: method,
      data: data,
      // header: {
      //   'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
      //   'Accept': 'application/json'
      // },
      dataType: 'json',
      success: function (res) {
        callback(res.data);
      },
      fail: function (err) {
        errFun(res);
      }
    })
  }

})