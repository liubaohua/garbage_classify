//index.js
const app = getApp()


Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
,
globalData:[]
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    var that =this
    // if (wx.getUserProfile) {
    //   console.log(that.data.userInfo.gender)
    //   this.setData({
    //     canIUseGetUserProfile: true,
    //   })
    // }

    // wx.getUserProfile({
    //   desc: '用于完善会员资料', 
    //   success: (res) => {
    //     console.log(res.userInfo.nickName)
    //     this.setData({
    //       canIUseGetUserProfile: true,
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   },
    //   fail:(res)=>
    //   {    
    //     console.log(res)
    //   },
    // }
    // )

   
    //that.getUserProfile();    
    // 在小程序代码中：


  //   console.log("get data from another applet")
  //   wx.cloud.callFunction({
  //     name: 'ttt',//调用方云函数
  //    success(res){
  //   //console.log(res.result)
  //   that.setData({
  //     globalData:JSON.parse(res.result)
  //  })
  // },
  // fail(res)
  // {
  //   console.log(res)
  // }
  // }
  // )


  
wx.cloud.callFunction({
  name: 'addNum',//调用方云函数
  data: {
    a: 12,
    b: 667,
  },
 success(res){
console.log(res.result.sum)
},
fail(res)
{
console.log("err_>"+res)
}
}
)

    
  },
  onOrderAdd(){
    wx.navigateTo({
      url: '../orderadd/orderadd',
    })
  },
  doUpdateUserData()
{
  var that =this
  // 在小程序代码中：
  console.log("update data in another applet")
  wx.cloud.callFunction({
    name: 'updateUserData',//调用方云函数
    data:{address:"西"},
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

  doQueryData()
  {
    let that = this;
    console.log(that.data.globalData[0])
      wx.showToast(
      {
        title:that.data.globalData[0]._id,
        icon:'success'
      }
    )
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log("get userinfo");
    wx.getUserProfile({
      desc: '获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("succ")
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  
  onAssess: function (res) {
    console.log(res)
  },
  onOrderList: function (res) {
    wx.navigateTo({
      url: '../orderlist/orderlist',
    })

  },

  onConfig: function (res) {
    wx.navigateTo({
      url: '../config/config',
    })


  },
  onManagers: function (res,b) {
    wx.navigateTo({
      url: '../managers/main',
    })
  },
  onUserAdd: function (res) {
    //console.log(res.currentTarget.dataset.usertype)
    wx.navigateTo({
      url: '../useradd/useradd?usertype='+res.currentTarget.dataset.usertype,
    })
  },
  onExit: function (res,a,b) {
    console.log(res.target)
  }
})
