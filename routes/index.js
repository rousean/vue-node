const root = require('./root')
const user = require('./user')
const menu = require('./menu')

module.exports = app => {
  app.use(root)
  // 登录接口
  app.use('/user', user)
  // 菜单接口
  app.use('/menu', menu)
}
