// miniprogram/pages/managers/userlist/userlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist:[],
    usertype:'user',
    hasData:false
  },
  onBack: function (options) {
    wx.navigateBack({
      delta: 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var id = options.usertype;

   // console.log(options)
    if(options.usertype=="staff")
    //console.log("ss")
    this.setData({
      usertype:"staff"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    console.log(that.data.usertype)
    wx.cloud.callFunction({
      name: 'querybase',//调用方云函数
      data:{querytype:'users',usertype:that.data.usertype},
     success(res){
    //console.log(res.result)
    that.setData({
      hasData:false
    })

    that.setData({
      userlist:JSON.parse(res.result)
   })
   if(that.data.userlist!=null && that.data.userlist.length>0)
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