const app = getApp()

Page({
  data: {
    region: [],
    customItem: '',
    name:'',
    page:'',
    dizhi:[],
    details:''
  },
  onLoad(e){
    console.log(JSON.parse(e.appData))
    let datas = JSON.parse(e.appData)
    console.log(app.data.xiugaiAddress)
    if (e.add == 1) {
      this.setData({
        name: datas.name,
        page: datas.page,
        dizhi: datas.dizhi,
        region:datas.dizhi,
        details: datas.details
      })
    }
  },
  province: function (e) {
    this.setData({
      region: e.detail.value,
      dizhi:e.detail.value
    })
  },
  tijiao(){
    let data=this.data
    app.data.address.push({
      name: data.name,
      page: data.page,
      dizhi: data.dizhi,
      details: data.details
    })
    wx.navigateTo({
      url: `../index`
    })
  },
  userNameFn(e) {
    this.setData({
      name: e.detail.value
    })
  },
  pageBtn(e) {
    this.setData({
      page: e.detail.value
    })
  },
  detailsBtn(e) {
    this.setData({
      details: e.detail.value
    })
  },
})