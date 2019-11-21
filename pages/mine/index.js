// pages/mine/index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lianxiwm: {},
    urls: '',
    show: false,
    userInfo: {},
    hasUserInfo:false,
    // 订单图标上的标记
    reddot:{
      reddot1: 0, //待付款
      reddot2: 0, //待发货
      reddot3: 0, //待收货
      reddot4: 0, //已完成
      reddot5: 0, //已取消
    },
    integral: '--',//integral
    zhuangtais:'',
  },
  onLoad: function () {
    // console.log(app.data.zhuangtais)
    this.setData({
      zhuangtais: app.data.zhuangtais
    })
    let that=this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        integral:123,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          integral: 123,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }// 获取app.js的url 赋值给urls -->图片地址链接 
    this.setData({
      urls: app.data.urls
    })
    // 联系我们
    wx.request({
      url: app.data.urls + '/admin.php/contact_us/index',
      method: 'get',
      header: {
        'X-Requested-With': 'xmlhttprequest',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data) 
        that.setData({
          lianxiwm: res.data.rows[0]
        })
      }
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 个人设置 跳转
  individualBtn(){
    wx.navigateTo({
      url: `./individual/index`
    })
  },
//调取微信本地的地址 
  addressBtn() {
    wx.getSetting({
      success(res) {
        // console.log("vres.authSetting['scope.address']：", res.authSetting['scope.address'])
        if (res.authSetting['scope.address']) {
          wx.chooseAddress({
            success(res) {
              // 选择地址 返回的参数
              // console.log(res)
            }
          })
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        } else {
          if (res.authSetting['scope.address'] == false) {
            wx.openSetting({
              success(res) {
              }
            })
          } else {
            wx.chooseAddress({
              success(res) {
              }
            })
          }
        }
      }
    })
  },
  //签到跳转 btn
  qiandaoBtn() {
    wx.navigateTo({
      url: `./signIn/index`
    })
  },
  // 登录 跳转 
  login() {
    wx.redirectTo({
      url: `../login/loginAccounts/index`
    })
  },
  // 我的订单 
  chakanqunbu() {
    wx.navigateTo({
      url: `./mineOrderForm/index`
    })
  },
  // 订单跳转 
  orderJump(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `./mineOrderForm/index?id=${id}`
    })
  },
  // 增值服务跳转 
  rightsBtn() {
    wx.navigateTo({
      url: `./rights/index`
    })
  },
  kefus(){
    this.setData({
      show:true
    })
  },
  showBtn() {
    this.setData({
      show: false,
    })
  },
})