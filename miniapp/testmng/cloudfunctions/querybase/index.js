// 云函数入口文件
const cloud = require('wx-server-sdk')

// 云函数入口函数
exports.main = async (event, context) => {
  let { address,querytype,usertype} = event
  var tabname = null
  if(querytype=="orders")
    tabname="orders"
  if(querytype=="users")
    tabname="users"
  if(querytype=="invs")
    tabname="invs"
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

    if(tabname=="orders")
    {
      const db = c1.database()
      await db.collection(tabname)
      //查询条件
        .field({   })
        .where({
          address:{
            $regex:'.*'+address+'.*',
            $options:'1'
          }
        })
        .get()
        .then(res => {
          console.log('获取-A数据库-成功',res.data)
          resolve(JSON.stringify(res.data, null, 2))
        })
        .catch(err => {
          console.log('获取-A数据库-失败',err)
          reject(err)
        })
    }
    if(tabname=="users")
    {
      const db = c1.database()
    await db.collection(tabname)
    //查询条件
      .field({   })
      .where({
        usertype:usertype
      })
      .get()
      .then(res => {
        console.log('获取-A数据库-成功',res.data)
        resolve(JSON.stringify(res.data, null, 2))
      })
      .catch(err => {
        console.log('获取-A数据库-失败',err)
        reject(err)
      })
    }
    
      
  })

}
