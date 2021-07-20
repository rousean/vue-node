'use strict'

// 全局配置
const config = {
  port: '3000',
  mongodb: 'mongodb://localhost:27017/vue',
  mysql: {
    host: '127.0.0.1', // IP
    port: 3306, // 端口号
    database: 'vue', // 数据库名
    user: 'root', // 数据库用户名
    password: '', // 数据库密码
  },
  jwtSecret: '710867a9-855e-419c-94bf-be93fc3bbbb8',
  expiresIn: 60 * 60,
  error: 0,
  success: 1,
}

module.exports = config
