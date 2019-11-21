// pages/orderForm/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[], 
    isChecked:false,
    dizhi:{},
    dizhitrue:'添加收货地址',
    truese:false,
    tariff:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 获取 购物车页面 传过来的商品/商品列表
    this.setData({
      goods: JSON.parse(options.data),
      tariff: Number(options.tariff)
    })
  },
  // 积分switch按钮
  changeSwitch(){
    let that = this
    this.setData({
      isChecked:!this.data.isChecked
    })
    if (this.data.isChecked){
      that.setData({
        truese: true
      })
    }else{
      that.setData({
        truese: false
      })
    }
  },
  // 选择收货地址
  shippingAddress() {
    let that=this
      wx.getSetting({
        success(res) {
          // console.log("vres.authSetting['scope.address']：", res.authSetting['scope.address'])
          if (res.authSetting['scope.address']) {
            wx.chooseAddress({
              success(res) {
                // 获取wx本地收货地址
                that.setData({
                  dizhi: res,
                  dizhitrue: '收货地址'
                })
              }
            })
            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问

          } else {
            if (res.authSetting['scope.address'] == false) {
              wx.openSetting({
                success(res) {
                  // console.log(res.authSetting,'3')
                }
              })
            } else {
              wx.chooseAddress({
                success(res) {
                  // console.log(res,'2')
                  
                }
              })
            }
          }
        }
      })
  },

  // 加
  jia(e) {
    let ids = e.target.dataset.id
    let article = this.data.goods;
    for (var i = 0; i < article.length; i++) {
      if (ids == article[i].id) {
        article[i].num += 1;
      }
    }
    if (this.data.tariff != 0) {
      this.setData({
        tariff: this.data.tariff += e.target.dataset.price
      })
    }
    this.setData({
      goods: article
    })
  },
  // 减
  jian(e) {
    let ids = e.target.dataset.id
    let article = this.data.goods;
    for (var i = 0; i < article.length; i++) {
      if (ids == article[i].id) {
        if (article[i].num != 1) {
          article[i].num -= 1;
        } else {
          return
        }
      }
    }
    if (this.data.tariff != 0.00) {
      this.setData({
        tariff: this.data.tariff -= e.target.dataset.price
      })
    }
    this.setData({
      goods: article
    })
  },
  // 提交订单
  tijiaodingdan:function(e){
    
  }
})