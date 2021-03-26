// miniprogram/pages/useradd/useradd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    useraddr:null,
    userphone:null,
    userdistrict:null,
    invcname:null,
    invname:null
  },
  onInputInvcname: function (e) {
    this.setData({invcname:e.detail.value})
  },
  onInputInvname: function (e) {
    this.setData({invname:e.detail.value})
  },
  onInputUsername: function (e) {
var that =this
that.setData({username:e.detail.value})
  },
  onInputUserdistrict: function (e) {
var that =this
that.setData({userdistrict:e.detail.value})
  },
  onInputUseraddr: function (e) {
var that =this
that.setData({useraddr:e.detail.value})
  },
  onInputUserphone: function (e) {
var that =this
that.setData({userphone:e.detail.value})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   // console.log("data is->"+options.usertype)
    this.setData({usertype:options.usertype})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onError: function () {
    console.log("onError")
  },

  onReady: function () {
    
  },
  onAdd: function () {
    var that =this
    var username = that.data.username
    wx.cloud.callFunction({
      name: 'addUser',//调用方云函数
      data:{username:that.data.username,
        userphone:that.data.userphone,
        userdistrict:that.data.userdistrict,
        useraddress:that.data.useraddress,
        usertype:that.data.usertype
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
  onAdd1: function () {
    console.log("adding....")
try{
  
  var that = this
  const db = wx.cloud.database()
  const _ = db.command
  db.collection('users').add(
    {
      data:{
        username:that.data.username,
        userphone:that.data.userphone,
        useraddr:that.data.useraddr,
        userdistrict:that.data.userdistrict,
      },
      success:function(res)
      {
        wx.showModal({
          title: '提示',
          content: '保存成功',
          showCancel:false,
          success:function(e)
          {
            wx.navigateBack({
              delta: 0,
            })
          }
        })          
      },
      fail:function(res)
      {
        wx.showModal({
          title: '提示',
          content: res,
          showCancel:false,
        })
      }
    }
  )
  }catch(err){
    console.log("excep:"+err)
    wx.showModal({
      title: '提示',
      content: err,
      showCancel:false,
    })

  }finally{
    console.log("errr")
  }
  


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