// 引入mysql模块
let mysql = require('mysql')
// 引入数据库的配置
const config = require('config-lite')

/**
 * @param {*} sql sql语句
 * @param {*} params sql语句中需要的数据
 * @returns
 */
function query(sql, params) {
  let conn = mysql.createConnection(config.mysql)
  return new Promise((resolve, reject) => {
    // 连接数据库
    conn.connect(err => {
      if (err) {
        console.log('数据库连接失败！')
        throw err
      }
      console.log('数据库连接成功！')
    })
    // 查询数据库
    conn.query(sql, params, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
    // 关闭数据库
    conn.end(err => {
      if (err) {
        console.log('关闭数据库连接失败！')
        throw err
      }
    })
  })
}

module.exports = query
