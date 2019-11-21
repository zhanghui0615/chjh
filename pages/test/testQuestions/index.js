// pages/test/testQuestions/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nums: 0,
    total: 0,
    num: 1,
    widths: 1,
    subject: [],
    optionNums: 0,
    keys: '',
    indexs: '',
    jishu:[],//记录每次点击的选项
    clickId:0,
  },
  jia(e) {
    this.setData({
      clickId: e.currentTarget.id + e.currentTarget.dataset.number
    })
    
    let num = e.currentTarget.dataset.number
    let ids = e.currentTarget.dataset.id
    let jishu = this.data.jishu
    let that = this
    // 判断数组里面num
    jishu.forEach(function(val){
      if (val.num == num){
        val.id=ids
      }
    })
    that.data.jishu.push({
      id: ids,
      num: num
    })
    if (this.data.nums != this.data.total+1 ) {
      this.setData({
        keys: e.target.dataset.id,
        num: this.data.num += 1,
        nums: this.data.nums += 1,
        widths: this.data.widths += 100 / this.data.total
      })
    }
    console.log(this.data.nums)
    if (this.data.nums == this.data.subject.length ) {
      // 数组里面的num进行判断 去重
      let as= this.data.jishu
      let res=[];
      let obj={};
      for(var i=0;i<as.length;i++){
        if(!obj[as[i].num]){
          res.push(as[i]);
          obj[as[i].num] =true;
        }
      }
      let a = { "attr": res }
      let b = JSON.stringify(a)
      wx.navigateTo({
        url: '../testResults/index?attr='+b,
      })
    }
  },
  jian() {
    if (this.data.nums != 0) {
      this.setData({
        num: this.data.num -= 1,
        nums: this.data.nums -= 1,
        widths: this.data.widths -= 100 / this.data.total
      })
      if (this.data.widths < 0) {
        this.setData({
          widths: 0
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
       total: this.data.subject.length,
    })
    let that = this
    wx.request({
      url: app.globalData.URL + '/test_question/index?sort=weigh&order=desc',
      method: 'get',
      header: {
        'X-Requested-With': 'xmlhttprequest',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        let a = []
        res.data.rows.forEach(function (val) {
          val.optionjson = JSON.parse(val.optionjson)
        })
         that.setData({
          subject: res.data.rows,
          total: res.data.rows.length,
           widths: parseInt(100 / res.data.rows.length) 
        })
      }
    })
  },  
})