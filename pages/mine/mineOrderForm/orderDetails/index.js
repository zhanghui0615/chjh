// pages/mine/mineOrderForm/orderDetails/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodes:{},
    das: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    urls: '',
    num:[],
    bottoms:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取订单的商品信息
    let data = JSON.parse(options.index)
    console.log(data)
    this.setData({
      goodes:data
    })
    let that = this
    this.setData({
      urls: app.data.urls
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
  },
  qx() {
    wx.showToast({
      title: '复制成功',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 2000
    })
  },
  qrs() {
    let that=this
    wx.showToast({
      title: '交易成功',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 2000
    })
    setTimeout(function () {
      that.setData({
        bottoms: true,
      })
    },300)
  },
  guanbis() {
    this.setData({
      bottoms: false,
    })
  }
})