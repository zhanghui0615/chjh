
const app = getApp()


Page({
  data: {
    page:0
  },
  onLoad:function(e){
    this.setData({
      page:app.data.address
    })
  },
  xinzeng(){
    wx.navigateTo({
      url: `./addAddress/index`
    })
  },
  btnxiugai(e){
    app.data.xiugaoAddress = e.currentTarget.dataset.items
    console.log(app.data.xiugaoAddress)
    wx.navigateTo({
      url: `./addAddress/index?add=1&appData=${JSON.stringify(app.data.xiugaoAddress)}`
    })
  },
  aaaaaaa() {
    wx.getSetting({
      success(res) {
      console.log("vres.authSetting['scope.address']：",res.authSetting['scope.address'])
      if (res.authSetting['scope.address']) {
      wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
      })
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        
      } else {
      if (res.authSetting['scope.address'] == false) {
      console.log("222")
      wx.openSetting({
        success(res) {
        console.log(res.authSetting)
        
        }
      })
      } else {
      wx.chooseAddress({
        success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        }
      })
      }
      }
      }
    })
  },
})