// pages/category/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urls: '',
    types: [],
    currType: 0,
    typesContent: [],
    synthesizeData: true,
    priceData: false,
    volumeData: false,
    panduan: true,
    height: 0,
    wu:0,
    top:0,
    bottom:0,
  },
  onLoad: function () {
    let that = this;
    that.setData({
      urls: app.data.urls,
      wu: 1
    })
  // 获取设备高度 
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight
        })
      }
    });

    // 分类
    wx.request({
      url: app.globalData.URL + '/category/index?sort=weigh&order=desc&type=product',
      method: 'get',
      header: {
        'X-Requested-With': 'xmlhttprequest',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        if (res.statusCode === 200) {
          that.setData({
            types:res.data.rows,
            currType:res.data.rows[0].id
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
        console.log(res)
        if (res.statusCode === 200) {
          let a = []
          res.data.rows.forEach(function (val) {
            val.images = val.images.split(',')
          })
          that.setData({
            typesContent: res.data.rows
          })
        }
      }
    })
  },
  // 点击做左边导航切换
  tapType(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      currType: e.currentTarget.dataset.type.id
    })
  },
  // 小到大
  compare(prop) {
    return function(a, b) {
      var val = a[prop];
      var vals = b[prop];
      return val - vals
    }
  },
  // 大到小
  compares(prop) {
    return function(a, b) {
      var val = a[prop];
      var vals = b[prop];
      return vals - val
    }
  },
  // 综合排序
  synthesize() {
    this.setData({
      synthesizeData: true,
      priceData: false,
      volumeData: false,
      top: 0,
      bottom: 0,
    })
    console.log(this.data.panduan)
    if (this.data.panduan) {
      this.setData({
        typesContent: this.data.typesContent.sort(this.compare('id')),
        panduan: false,
        wu:2
      })
    } else {
      this.setData({
        typesContent: this.data.typesContent.sort(this.compares('id')),
        panduan: true,
        wu:1
      })
    }
    console.log(this.data.wu)
  },
  // 价格排序
  price() {
    this.setData({
      priceData: true,
      synthesizeData: false,
      volumeData: false,
      wu: 0,
      bottom: 0,
    })
    if (this.data.panduan) {
      this.setData({
        typesContent: this.data.typesContent.sort(this.compare('price')),
        panduan: false,
        top:1,
      })
    } else {
      this.setData({
        typesContent: this.data.typesContent.sort(this.compares('price')),
        panduan: true,
        top:2,
      })
    }
  },
  //销量排序
  volume() {
    this.setData({
      volumeData: true,
      synthesizeData: false,
      priceData: false,
      top:0,
      wu:0,
    })
    if (this.data.panduan) {
      this.setData({
        typesContent: this.data.typesContent.sort(this.compare('purchaseNumber')),
        panduan: false,
        bottom:1,
      })
    } else {
      this.setData({
        typesContent: this.data.typesContent.sort(this.compares('purchaseNumber')),
        panduan: true,
        bottom:2,
      })
    }
  },
  // 点击商品跳转
  productDetails(e) {
    let datas = e.currentTarget.dataset.data
    app.data.productJumpDetails = datas
    wx.navigateTo({
      url: `../productDetails/index?name=${datas}`
    })
  },
  seek(e) {
    console.log(e.detail.value)
    wx.navigateTo({
      url: '../more/index?value=' + e.detail.value,
    })

  }
})