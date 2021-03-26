// miniprogram/pages/managers/invlist/invlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataset:[]
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
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('counters').add(
      {
      data : {
        name:'aaa',
        sex:'男',
        birth:"2020-03-31"
      },
      success: function(res) {
console.log("ok")
      }
    }
    )

db.collection('counters').where({
  // progress: _.gt(30).and(_.lt(70))
  count:_.gt(0),
  _id:_.gt('')
})
.get({
  success: function(res) {
    that.setData({
      dataset:res.data
    })
    console.log(res.data[0].count)
  }
})

    // wx.cloud.database.collection("counters").where().get(
    //   {
    //     success: function(res) {
    //       console.log(res.data)
    //     }
    //   }
    // )

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

  }
})