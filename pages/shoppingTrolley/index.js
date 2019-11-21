// pages/shoppingTrolley/index.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    error: '',
    article: [{
      id: 0,
      img: '../../img/about_img01.png',
      title: '标题标题标题标题',
      price: 100,
      num: 1,
      checked: false,
    },],
    tariff: "0.00",
    amount: 0,
    quanxuan: false,
    bianjis: true,
    bianjise: false,
    numbernums: 0,
    commodityID: []
  },
  // chack选择
  checkboxChange(e) {
    var article = this.data.article;
    var checkArr = e.detail.value;
    let s = []
    let tariff = 0
    let amount = []
    let that = this
    checkArr.forEach(function (val) {
      s.push(val.split(',')[0])
      tariff += Number(val.split(',')[1]) * Number(val.split(',')[2])
      amount.push(val.split(',')[2])
    })
    if (this.data.bianjise) { } else {
      that.setData({
        tariff: tariff
      })
    }
    for (var i = 0; i < article.length; i++) {
      if (s.indexOf(i + "") != -1) {
        article[i].checked = true;
      } else {
        article[i].checked = false;
      }
    }

    this.setData({
      article: article,
      numbernums: s.length,
      commodityID: s
    })

  },
  // 加
  jia(e) {
    let ids = e.target.dataset.id
    let article = this.data.article;
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
      article: article
    })
  },
  // 减
  jian(e) {
    let ids = e.target.dataset.id
    let article = this.data.article;
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
      article: article
    })
  },
  // 全选
  checkAll(e) {
    let tariff = 0
    let anum = 0
    let article = this.data.article
    if (this.data.quanxuan) {
      this.setData({
        quanxuan: false
      })
      for (var i = 0; i < article.length; i++) {
        article[i].checked = false
        tariff = 0.00
        anum = 0
      }
    } else {
      this.setData({
        quanxuan: true
      })
      for (var i = 0; i < article.length; i++) {
        article[i].checked = true
        tariff += Number(article[i].price) * Number(article[i].num)
        anum = article.length
      }
    }
    this.setData({
      article: article,
      tariff: tariff,
      numbernums: anum
    })
  },
  // 编辑
  bianji() {
    this.setData({
      bianjis: !this.data.bianjis,
      bianjise: !this.data.bianjise
    })
    let a = this.data.article
    if (this.data.bianjise == false) {
      for (var i = 0; i < a.length; i++) {
        a[i].checked = false
      }
    }
    this.setData({
      article: a,
      numbernums: 0,
      commodityID: []
    })
  },
  // 删除商品
  deletes() {
    let as = []
    let a = this.data.article;
    let id = this.data.commodityID
    if (id.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择你要删除的商品',
      })
    } else {
      a.forEach(function (val) {
        id.forEach(function (vals) {
          if (val.id != vals) {
            as.push(val)
          }
        })
      })
      this.setData({
        article: as
      })
    }
  },
  // 结算跳转
  orderForm(e) {
    let that=this
    let a = this.data.article;
    let data = []
    a.forEach(function (val) {
      if (val.checked == true) {
        data.push(val)
      }
    })
    if (data.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择要购买的产品',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: `../orderForm/index?data=${JSON.stringify(data)}&tariff=${that.data.tariff}`
      })
    }

  }
})