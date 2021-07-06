const userCrud = require('../../models/user/userModel')

class User {
  constructor() {
    this.login = this.login.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
  }
  // 用户登录中间件
  async login(req, res, next) {
    let username = req.body.username
    let password = req.body.password
    const token = username + '-token'
    const result = await userCrud.findOne(
      { username: username },
      { username: 1, password: 1, _id: 0 }
    )
    if (result) {
      if (result.password === password) {
        res.send({
          code: 20000,
          data: {
            token: token,
          },
        })
      } else {
        res.send({ code: 60204, message: '用户名密码不正确！' })
      }
    } else {
      res.send({ code: 60205, message: '用户名不存在！' })
    }
  }
  // 获取用户信息中间件
  async getUserInfo(req, res, next) {
    let token = req.query.token
    token = token.split('-')[0]
    const result = await userCrud.findOne(
      { username: token },
      {
        roles: 1,
        introduction: 1,
        avatar: 1,
        name: 1,
        _id: 0,
      }
    )
    res.send({ code: 20000, data: result })
  }
}

module.exports = new User()
