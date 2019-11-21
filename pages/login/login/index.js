// pages/login/loginAccounts/index.js
const app = getApp();
Page({

  // 页面初始数据
  data: {
    phoneLoginFalse: false,
    phoneCodeText: '点击获取',
    phoneCodeTexts: '点击获取',
    disabled: true, //验证码获取按钮
    disableds: true, //验证码获取按钮
    enterprise: false,
    phoneLoginFalses: false,
    phoneNum: '',
    phoneNums: '',
    loginBtn: true, //短信验证码登录按钮
    loginBtns: true, //企业短信验证码登录按钮
    phone:'',
    yanzhengma:'',//验证码
  },
  // 个人
  bindViewTap: function (e) {
    // console.log(e.target.id)
    // wx.navigateTo({
    //   url: `../loginAccounts/index?id=${e.target.id}`
    // })
     this.setData({
      phoneLoginFalse:true
    })
  },
  // 企业
  bindViewTaps: function (e) {
    // console.log(e.target.id)
    // wx.navigateTo({
    //   url: `../loginAccounts/index?id=${e.target.id}`
    // })
    this.setData({
      phoneLoginFalses: true
    })
  },
  // 点击透明部分关闭短信验证码
  guanbi: function () {
    this.setData({
      phoneLoginFalse: false,
      phoneLoginFalses: false,
      enterprise: false
    })
  },
  // 点击透明部分关闭短信验证码
  guanbiEnterprise() {
    this.setData({
      enterprise: false
    })
  },
  // 企业登录
  loginRegisteres() {
    let that = this
    // 登录判断验证码 
    wx.request({
      url: app.data.urls + '/api/sms/check',
      method: 'post',
      header: {
        'Content-Type': '	application/x-www-form-urlencoded'
      },
      data: {
        mobile: that.data.phoneNums,
        event: 'register',
        captcha: that.data.yanzhengma
      },
      success: res => {
        console.log(res.data.msg)
        if (res.data.msg == '成功'){
            this.setData({
              enterprise: true
            })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 1000
          })
        }
      }
    })
    
  },
  // 企业注册
  enterpriseLogin() {
    app.data.zhuangtais='企业'
    wx.switchTab({
      url: '../../homePage/index',
    })
    
  },
  loginRegister() {


    let that = this
    // 登录判断验证码 
    wx.request({
      url: app.data.urls + '/api/sms/check',
      method: 'post',
      header: {
        'Content-Type': '	application/x-www-form-urlencoded'
      },
      data: {
        mobile: that.data.phoneNums,
        event: 'register',
        captcha: that.data.yanzhengma
      },
      success: res => {
        console.log(res.data.msg)
        if (res.data.msg == '成功') {
          app.data.zhuangtais = '个人'
          wx.switchTab({
            url: '../../homePage/index',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 1000
          })
        }
      }
    })

  },
  // 获取验证码 倒计时 
  phoneCodeBtn() {
    let num = 59
    var that = this;
    that.setData({
      disabled: true
    })
    var inter = setInterval(function () {
      num--
      that.setData({
        phoneCodeText: num
      })
      if (num <= 0) {
        clearInterval(inter);
        that.setData({
          phoneCodeText: '重新获取',
          disabled: false
        })
      }
    }, 1000)
    // 获取验证码
    wx.request({
      url: app.data.urls + '/api/sms/send',
      method: 'post',
      header: {
        'Content-Type': '	application/x-www-form-urlencoded'
      },
      data: {
        mobile: that.data.phoneNums,
        event: 'register'
      },
      success: res => {
        if (res.data.msg == '发送成功') {
          console.log(res.data.msg)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 1000
          })
        }
      }
    })
  },
  // 获取验证码 倒计时 
  phoneCodeBtns() {
    let num = 59
    var that = this;
    that.setData({
      disableds: true
    })
    var inter = setInterval(function () {
      num--
      that.setData({
        phoneCodeTexts: num
      })
      if (num <= 0) {
        clearInterval(inter);
        that.setData({
          phoneCodeTexts: '重新获取',
          disableds: false
        })
      }
    }, 1000)
    // 获取验证码
    wx.request({
      url: app.data.urls + '/api/sms/send',
      method: 'post',
      header: {
        'Content-Type': '	application/x-www-form-urlencoded'
      },
      data: {
        mobile: that.data.phoneNums,
        event:'register'
      },
      success: res => {
        if (res.data.msg == '发送成功') {
          console.log(res.data.msg)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 1000
          })
        }
      }
    })
  },
  // 手机号 input事件
  inputPhoneNum: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      console.log(checkedNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum,
          disabled:!this.data.disabled,
        })
      }
    } else {
      this.setData({
        phoneNum: '',
        disabled: true,
      })
    }
  },
  // 企业账号 手机号 input value
  inputPhoneNums: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      console.log(checkedNum)
      if (checkedNum) {
        this.setData({
          phoneNums: phoneNum,
          disableds: !this.data.disableds,
          disabled: !this.data.disabled,
        })
      }
    } else {
      this.setData({
        phoneNums: '',
        disableds: true,
        disabled: true,
      })
    }
  },
  // 验证码 input事件
  authCodeValue:function(e){
    let val = e.detail.value
    let that=this
    if(val != null){
      that.setData({
        yanzhengma: val,
        loginBtns: false,
        loginBtn:false
      })
    } else {
      that.setData({
        yanzhengma: val,
        loginBtns: true,
        loginBtn: true
      })
    }
  },
  // 判断手机号是否正确
  checkPhoneNum: function (phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '请输入正确格式的手机号',
        icon:'none'
        // image: '../../images/fail.png'
      })
      return false
    }
  },
})