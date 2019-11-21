// pages/mine/signIn/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tobuRadius:false, //签到状态 
    myToday:'', //周几
    show:false,
    newSignNum: 0, // 签到天数
    newSignIntegral:0, // 签到积分
    // 签到列表  isSigned是否签到
    isNewSignedArr: [
      {
        "day": '1天',
        "isSigned": true
      },
      {
        "day": '2天',
        "isSigned": true
      },
      {
        "day": '3天',
        "isSigned": true
      },
      {
        "day": '4天',
        "isSigned": true
      },
      {
        "day": '5天',
        "isSigned": true
      },
      {
        "day": '6天',
        "isSigned": true
      },
      {
        "day": '7天 ',
        "isSigned": true
      },
    ],
    tian:1,
    jifen:10,
    num:[],
    urls:'',
  },
  // 新签到
  signNewFn(e){
    var that = this;


    wx.request({
      url: app.data.urls + '/api/sing_in/dosign',
      method: 'post',
      header: {
        'X-Requested-With': 'xmlhttprequest',
        'Content-Type':'application/x-www-form-urlencoded',
        'token':'7f5f4681-8994-49a2-a2e8-c477b720993f'
      },
      success: res => {
        let dataMsg=res.data.msg
        if (dataMsg == '今天已签到,请明天再来!') {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        } else {
          that.setData({
            show: !this.data.show
          })
        }
      }
    })




    // const arr=[],
    //       newSignArr=[...arr,...that.data.isNewSignedArr];
    //       console.log(newSignArr)
    // newSignArr[that.data.newSignNum].isSigned = false;
    // that.setData({
    //   isNewSignedArr:newSignArr,
    //   newSignNum:+1,
    //   tobuRadius:true
    // })
  },
  showBtn() {
    this.setData({
      show: !this.data.show
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      urls: app.data.urls
    })
    //是否签到
    wx.request({
      url: app.data.urls + '/api/sing_in/dosign',
      method: 'post',
      header: {
        'X-Requested-With': 'xmlhttprequest',
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': '7f5f4681-8994-49a2-a2e8-c477b720993f'
      },
      success: res => {
        let dataMsg = res.data.msg
        if (dataMsg == '今天已签到,请明天再来!') {
          that.setData({
            tobuRadius:true
          })
        }
      }
    })

    //查看签到
    wx.request({
      url: app.data.urls + '/api/sing_in/index',
      method: 'post',
      header: {
        'X-Requested-With': 'xmlhttprequest',
        'token': '7f5f4681-8994-49a2-a2e8-c477b720993f'
      },
      success: res => {
        console.log(res.data)
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
        console.log(res.data)
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