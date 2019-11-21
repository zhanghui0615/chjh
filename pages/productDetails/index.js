// pages/productDetails/index.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urls: '',
    transferData: '',
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    heights: 306,
    currentData: 0,
  },
  onLoad: function (options) {
    this.setData({
      urls: app.data.urls,
      transferData: app.data.productJumpDetails,
      imgUrls: app.data.productJumpDetails.images
    })
    let that = this
    WxParse.wxParse('htmls', 'html', that.data.transferData.details_content, that, 5)
    WxParse.wxParse('htmlse', 'html', that.data.transferData.parameters_content, that, 5)
    WxParse.wxParse('htmlsee', 'html', that.data.transferData.standard_content, that, 5)
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    console.log(e.target.dataset.current)
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  onShareAppMessage: function (res) {
    var that = this;
    console.log(res)
    return {
      title: '',
      path: '/pages/list/list?id=' + that.data.scratchId,
      success: function (res) {
        // 转发成功
        that.shareClick();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})