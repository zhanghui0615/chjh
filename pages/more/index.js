// pages/more/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urls: '',
    num:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.value)
    let value = options.value
    let that=this
    // 获取app.js的url 赋值给urls -->图片地址链接 
    this.setData({
      urls: app.data.urls
    })
    // 产品相关
    wx.request({
      url: app.globalData.URL + '/product/index',
      method: 'get',
      data:{
        sort:'weigh',
        order:'desc',
        filter: { 'name': value},
        op:{'name':'='}
      },
      header: {
        'X-Requested-With': 'xmlhttprequest',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        let a = []
        res.data.rows.forEach(function (val) {
          val.images = val.images.split(',')
        })
        console.log(res)
        if (res.statusCode === 200) {
          that.setData({
            num: res.data.rows
          })
        }
      }
    })
  },
  inputs:function(e){
    let value = e.detail.value
    let that=this
    // 产品相关
    wx.request({
      url: app.globalData.URL + '/product/index',
      method: 'get',
      data: {
        sort: 'weigh',
        order: 'desc',
        filter: { 'name': value },
        op: { 'name': '=' }
      },
      header: {
        'X-Requested-With': 'xmlhttprequest',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        let a = []
        res.data.rows.forEach(function (val) {
          val.images = val.images.split(',')
        })
        console.log(res)
        if (res.statusCode === 200) {
          that.setData({
            num: res.data.rows
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})