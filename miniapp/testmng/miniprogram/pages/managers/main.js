// miniprogram/pages/managers/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  getPhoneNumber: function (e) {

    wx.login({
      success: res => {
        console.log("res=", res)

      }

    })

    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  onUsers: function () {
    wx.navigateTo({
      url: 'userlist/userlist?usertype=user',
    })
  },

  onStaffs: function () {
    wx.navigateTo({
      url: 'userlist/userlist?usertype=staff',
    })
  },
  
  onStatics: function () {
    wx.navigateTo({
      url: '../orderlist/orderlist',
    })
  },

  onInv: function () {
    wx.navigateTo({
      url: 'invlist/invlist',
    })
  },


  
})