// pages/login/loginAccounts/index.js
const app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlId:'',//login选择个人还是企业进行登陆传值id过来 获取id放到urlid 进行下一步判断来用
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    phoneCodeText:'点击获取',
    disabled:false,
    phoneLoginFalse:false,
    animationData: "",
    personal:false,
    enterprise:false,
    codes:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 获取上个页面传值过来的id并且赋值给urlId
    this.setData({
      urlId: options.id
    })
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              // console.log(res,'用户已经授权过')
              wx.switchTab({
                url: '../../homePage/index',
              })
            }
          });
        }
      }
    })


  },
  bindGetUserInfo:function(e){
    if (e.detail.userInfo) {
      //用户按了允许授权按钮后需要处理的逻辑方法体
      //var that = this;
      // console.log(1)
      let urlId = this.data.urlId
      let that = this
      wx.login({
        success: res => {
          wx.request({
            url: app.data.urls + '/api/user/login',
            method: 'post',
            header: {
              'X-Requested-With': 'xmlhttprequest'
            },
            data: {
              code: res.code
            },
            success: res => {
              console.log(res.data)
            }
          })
        }
      })
      // 用户点击允许 跳转到 个人账号 企业账号 页面
      wx.navigateTo({
        url: '../login/index?device=wx',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  // 手机号登录click
  phonelogin: function (e) {
    // this.setData({
    //   phoneLoginFalse:true
    // })

    wx.navigateTo({
      url: '../login/index?device=dx',
    })
    // console.log('短信验证登陆')
    // var animation = wx.createAnimation({

    //   duration: 1000,
    //   timingFunction: "ease",
    //   delay: 0,
    //   transformOrigin: "50% 50%",
    // })
    // animation.bottom(0).step();
    // this.setData({
    //   animationData: animation.export(),
    // })
  },
  // 点击透明部分关闭短信验证码
  guanbi: function () {
    this.setData({
      phoneLoginFalse: false
    })
  },
  guanbiPersonal: function () {
    this.setData({
      personal: false
    })
  },
  guanbiEnterprise:function(){
    this.setData({
      enterprise: false
    })
  },
  // 注册完登录
  // 个人
  personalLogin() {
    wx.switchTab({
      url: '../../homePage/index'
    })
  },
  // 企业
  enterpriseLogin() {
    wx.switchTab({
      url: '../../homePage/index'
    })
  },
  // 点击登录 打开注册
  loginRegister(){
    let urlId=this.data.urlId
    let that=this
    if (urlId == 'grzh'){
      that.setData({
        personal:true,
        phoneLoginFalse:false
      })
    } else if (urlId == 'qyzh') {
      that.setData({
        enterprise: true,
        phoneLoginFalse: false
      })
    }
  },
  // 获取验证码 倒计时 
  phoneCodeBtn(){
    let num = 59
    var that = this;
    that.setData({
      disabled:true
    })
    var inter = setInterval(function(){
      num--
      that.setData({
        phoneCodeText: num
      })
      if(num<=0){
        clearInterval(inter);
        that.setData({
          phoneCodeText: '重新获取',
          disabled: false
        })
      }
    },1000)
  },
  // 取消 左上角的home键
  onShow:function(){
    wx.hideHomeButton({
    })
  }
})