// 引入mongoose
const mongoose = require('mongoose')
// 引入配置
const config = require('config-lite')
// 引入告警模式
const chalk = require('chalk')

mongoose.connect(config.mongodb, {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.Promise = global.Promise
var mongodb = mongoose.connection
mongodb.once('open', () => {
  console.log(chalk.green('连接数据库成功'))
})

mongodb.on('error', function (error) {
  console.error(chalk.red('Error in MongoDb connection: ' + error))
  mongoose.disconnect()
})

mongodb.on('close', function () {
  console.log(chalk.red('数据库断开，重新连接数据库'))
  mongoose.connect(config.url, { server: { auto_reconnect: true } })
})

module.exports = mongodb
