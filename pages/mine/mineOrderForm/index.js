const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0, //跳转传值切换
    goods: [],
    nulls:[],
    clientHeight:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    }) 

    // 获取到传值过来到参数 赋值给currentdata
    this.setData({
      currentData:options.id
    })
    wx.request({
      url: app.globalData.URL + '/order/index',
      method: 'post',
      header: {
        'X-Requested-With': 'xmlhttprequest'
      },
      data:{
        sort:'id',
        order:'DESC',
        filter:{'user_id':'1'},
        op:{'user_id':'='}
      },
      success: res => {
        console.log(res)
        let data= res.data.rows

        switch (data.status) {
          case 1:
            if (data.pay_status == 1) {
              this.$set(data, 'order_status_name', '待付款')
            }
            if (data.pay_status == 2 && data.ship_status == 1) {
              this.$set(data, 'order_status_name', '待发货')
            }
            if (data.pay_status == 2 && data.ship_status == 3 && data.confirm == 1) {
              this.$set(data, 'order_status_name', '待收货')
            }
            if (data.pay_status == 2 && data.ship_status == 3 && data.confirm == 2 && data.is_comment == 1) {
              this.$set(data, 'order_status_name', '待评价')
            }
            if (data.pay_status == 2 && data.ship_status == 3 && data.confirm == 2 && data.is_comment == 2) {
              this.$set(data, 'order_status_name', '已评价')
            }
            if (data.pay_status == 4) {
              this.$set(data, 'order_status_name', '售后单')
            }
            break
          case 2:
            this.$set(data, 'order_status_name', '已完成')
            break
          case 3:
            this.$set(data, 'order_status_name', '已取消')
            break
        }
        console.log(data)
        // that.setData({
        //   goods:res.data.rows
        // })

      }
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    console.log(e.detail.current)
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 订单点击 进入订单详情
  orderDetailsClick(e) {
    let data = JSON.stringify(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: `./orderDetails/index?index=${data}`
    })
  },
  qx(){
    wx.showToast({
      title: '复制成功',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 2000
    }) 
  },
  qrs() {
    wx.showToast({
      title: '交易成功',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 2000
    })
  }
})