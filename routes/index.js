const root = require('./root')
const user = require('./user')
const menu = require('./menu')
const words = require('./words')

module.exports = app => {
  app.use(root)
  // 登录的接口
  app.use('/user', user)
  app.use('/menu', menu)

  // 百词斩app接口
  app.use('/words', words)
}
