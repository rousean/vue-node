const root = require('./root')
const users = require('./users')
const words = require('./words')

module.exports = app => {
  app.use(root)
  // 同源性分析系统的接口
  app.use('/users', users)
  // 百词斩app接口
  app.use('/words', words)
}
