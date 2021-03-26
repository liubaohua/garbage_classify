// miniprogram/pages/orderadd/orderadd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plandate:null,
    plantime:null,
    invcname:null,
    invname:null,
  },
  onOrderAdd: function (options) {
    var that =this
    var openid = app.globalData.openid
    console.log("openid->"+openid)
    wx.cloud.callFunction({
      name: 'addOrder',//调用方云函数
      data:{
        invcname:that.data.invcname,
        invname:that.data.invname,
        plandate:that.data.plandate,
        plantime:that.data.plantime,
        openid:openid,
        userid:'',
      },
     success(res){
    console.log("suc_>"+res.result)
  },
  fail(res)
  {
    console.log("err_>"+res)
  }
  }
  )
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
  onInputInvcname: function (e) {
this.setData({
  invcname:e.detail.value
})
  },
  onInputInvname: function (e) {
this.setData({
  invname:e.detail.value
})
  },
  onTapDate: function (e) {
    console.log(e.detail.value)
    this.setData({
      plandate:e.detail.value
    })
      },
      onTapTime: function (e) {
    this.setData({
      plantime:e.detail.value
    })
      },
})