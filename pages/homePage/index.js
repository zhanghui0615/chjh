// pages/homePage/index.js
const app = getApp();
// 引入 wxparse 的js文件
// var WxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urls: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    heights: 121,
    imgMenu: [{
      img: '../../img/img1.png',
      title: '新人福利'
    }, {
      img: '../../img/img2.png',
      title: '新人福利'
    }, {
      img: '../../img/img3.png',
      title: '新人福利'
    }, {
      img: '../../img/img4.png',
      title: '新人福利'
    },],
    num: [],
    htmls: '',
    styles: 0,
    marginTops: 0,
    heights: 'auto',
  },
  // 商品详情 点击商品跳转
  productDetails(e) {
    let datas = e.currentTarget.dataset.data
    app.data.productJumpDetails = datas
    wx.navigateTo({
      url: `../productDetails/index?name=${datas}`
    })
  },
  onLoad(options) {
    console.log(options)
    const that=this
    // 获取手机型号 进行判断 改变样式 
    wx.getSystemInfo({
      success: function (res) {
        if (res.model == 'iPhone X') {
          that.setData({
            styles: 1
          })
        } else if (res.model == 'iPhone XS Max') {
          that.setData({
            styles: 2
          })
        } else if (res.model == 'iPhone XR') {
          that.setData({
            styles: 2
          })
        } else {
          that.setData({
            styles: 0
          })
        }
      }
    })
    // let htmls='<div><span>123</span></div>'
    // const that = this;
    // // 第一个参数 数据名
    // // 第二个参数 可以是html或者md
    // // 第三个参数 传入的数据
    // // 第四个参数 为page对象 一般为this
    // // 第五个参数 为当图片自适应是左右的单一padding(默认为0,可选)
    // WxParse.wxParse('htmls', 'html', htmls, that, 5)
    // 获取app.js的url 赋值给urls -->图片地址链接 
    this.setData({
      urls: app.data.urls
    })
    // 轮播图
    wx.request({
      url: app.globalData.URL + '/Banner/index?sort=weigh&order=desc',
      method: 'get',
      header: {
        'X-Requested-With': 'xmlhttprequest'
      },
      success: res => {
        let that = this
        if (res.statusCode === 200) {
          that.setData({
            imgUrls: res.data.rows
          })
        }
      }
    })
    // 产品相关
    wx.request({
      url: app.globalData.URL + '/product/index?sort=weigh&order=desc',
      method: 'get',
      header: {
        'X-Requested-With': 'xmlhttprequest',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        let a = []
        res.data.rows.forEach(function (val) {
          val.images = val.images.split(',')
        })
          that.setData({
            num: res.data.rows
          })
      }
    })
    // 授权管理
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // console.log(JSON.parse(res.rawData))
              //用户已经授权过
              // console.log(res,'用户已经授权过')
            }
          });
        } else {
          // 用户未授权跳转到登录页面
          // wx.redirectTo({
          //   url: '../login/loginAccounts/index',
          // })
        }
      }
    })
  },
  shopClick() {
    // 授权管理
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
            }
          });
        } else {
          // 未登录 跳到登录页面
          wx.redirectTo({
            url: '../login/loginAccounts/index',
          })
        }
      }
    })
  },
  // 更多
  more(){
    // 支付调用
    // wx.request({
    //   url: 'http://192.168.0.205:10007/api/pay/pay',
    //   method: 'get',
    //   header: {
    //     'X-Requested-With': 'xmlhttprequest'
    //   },
    //   success: res => {
    //     console.log(res)
    //     let data=res.data
    //     wx.requestPayment(
    //       {
    //         'appid': data.appid,
    //         'timeStamp': data.timeStamp,
    //         'nonceStr': data.nonce_str,
    //         'package': 'prepay_id='+data.package,
    //         'signType': 'MD5',
    //         'paySign': data.sign,
    //         'success': function (res) { console.log(res, '1') },
    //         'fail': function (res) { console.log(res, '2') },
    //         'complete': function (res) { console.log(res, '3') }
    //       })
    //   }
    // })
  wx.navigateTo({
      url: '../more/index',
    })
  },
  seek(e){
    console.log(e.detail.value)
    wx.navigateTo({
      url: '../more/index?value=' + e.detail.value,
    })

  }
})