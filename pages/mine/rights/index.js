// pages/mine/rights/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lianxiwm:{},
    clickView: true,
    clickViewj: false,
    clickViewp: false,
    show: false,
    mode: 1,
    urls:'',
    items: 10,
    info: {},
    dates: '暂无',
    infotext: [{
      left: '所属公司',
      right: '河北省邯郸市'
    }, {
      left: '电子邮箱',
      right: '1293281094@qq.com'
    }, {
      left: '公司地址',
      right: '北京市通州区土桥'
    }, {
      left: '经销商全称',
      right: '经销商全称经销商全称经销商全称'
    }, {
      left: '汽车品牌',
      right: '宝马740/揽胜'
    }, ],
    truse:false,
    infoses:[{
      name:'123',
      lianxi:'123123',
      zhiwe:'3221'
    }, {
        name: '123',
        lianxi: '123123',
        zhiwe: '3221'
      }]
  },
  clickView() {
    this.setData({
      clickView: true,
      clickViewj: false,
      clickViewp: false,
    })
  },
  clickViewj() {
    this.setData({
      clickView: false,
      clickViewj: true,
      clickViewp: false,
    })
  },
  clickViewp() {
    this.setData({
      clickView: false,
      clickViewj: false,
      clickViewp: true,
    })
  },
  clickPopUps() {
    this.setData({
      show: true,
    })
  },
  showBtn() {
    this.setData({
      show: false,
    })
  },
  more() {
    wx.navigateTo({
      url: './more/index',
    })
  },
  // 
  moreinfo() {
    this.setData({
      truse: !this.data.truse
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log(JSON.parse(res.rawData))
              let data = JSON.parse(res.rawData)
              that.setData({
                info: data
              })
            }
          });
        } else {}
      }
    })// 获取app.js的url 赋值给urls -->图片地址链接 
    this.setData({
      urls: app.data.urls
    })
    // 联系我们
    wx.request({
      url: app.data.urls + '/admin.php/contact_us/index',
      method: 'get',
      header: {
        'X-Requested-With': 'xmlhttprequest',
        'Content-Type':'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        that.setData({
          lianxiwm: res.data.rows[0]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
  
})