// pages/test/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    nums: 0,
    num: 25,
    show: false,
    showhy: false,
  },
  onLoad(options){
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
          wx.redirectTo({
            url: '../login/loginAccounts/index',
          })
        }
      }
    })
  },
  // 点击下一条数据展示
  jia() {
    if (this.data.nums != this.data.num) {
      console.log(this.data.width)
      this.setData({
        nums: this.data.nums += 1,
        width: this.data.width += 100 / this.data.num
      })
    }
  },
  // 点击上一条数据展示
  jian() {
    if (this.data.nums != 0) {
      this.setData({
        nums: this.data.nums -= 1,
        width: this.data.width -= 100 / this.data.num
      })
    }
  },
  showBtn() {
    this.setData({
      show: !this.data.show
    })
  },
  startTest() {
    wx.navigateTo({
      url: './testQuestions/index'
    })
  },
  yq() {
    this.setData({
      showhy: !this.data.showhy
    })
  },
})