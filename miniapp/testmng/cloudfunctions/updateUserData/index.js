// 云函数入口文件
const cloud = require('wx-server-sdk')

// 云函数入口函数
exports.main = async (event, context) => {
  let { address} = event
  // 声明新的 cloud 实例
  var c1 = new cloud.Cloud({
    appid: 'wxfac26276592e5d06',
    // 资源方 AppID
    resourceAppid: 'wxdc5d2666b9ef0b17',
    // 资源方环境 ID
    resourceEnv: 'cloud1-1gzd7kuk9486400d',
  })

  // 跨账号调用，必须等待 init 完成
  // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
  await c1.init()

  // 完成后正常使用资源方的已授权的云资源
  return new Promise(async (resolve, reject) => {

    //多数报错504002什么的,都是没写下面这段代码,或者查询的数据库不存在导致
    const db = c1.database()
    //const newCount = this.data.count + 1
    const _ = db.command
       await db.collection('users').where({

      address:{
        $regex:'.*'+address+'.*',
        $options:'1'
      }
    }).update({
      data: {
        count: _.inc(10)
      },
      success: res => {
        this.setData({
          //count: newCount
        })
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })

    
      
  })

}
