// pages/test/testResults/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let a = JSON.parse(options.attr)
    console.log(a.attr) //传值 获取过来的选项 
    let that=this
    // 授权管理
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              // 获取用户名 
             let data = JSON.parse(res.rawData)
              that.setData({
                name:data.nickName
              })
            }
          });
        } else {
          wx.redirectTo({
            url: '../login/loginAccounts/index',
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
    wx.reLaunch({
      url: '../../test/index'
    })
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
  onShareAppMessage: function (e) {
    console.log(e)
  }
})