// miniprogram/pages/orderlist/orderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  hasData:false,
  date:[],
  orderlist:null,
  address:""
},
onInputAddress:function(e)
{
  this.setData({
    address: e.detail.value
  })
},
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  onBack:function () {
    wx.navigateBack({
      delta: 0,
    })
  },
  onQuery:function () {
var that = this
    wx.cloud.callFunction({
      name: 'orderlist',//调用方云函数
      data:{querytype:'orders'},
     success(res){
    //console.log(res.result)
    that.setData({
      hasData:false
    })

    that.setData({
      orderlist:JSON.parse(res.result)
   })
   if(that.data.orderlist.length>0)
   {
//     console.log(">"+that.data.orderlist.length)
    that.setData({hasData:true})
   }

  },
  fail(res)
  {
    console.log("exception:"+res)
  }
  }
  )
  },

})