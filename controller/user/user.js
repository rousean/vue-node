const userCrud = require('../../models/user/user')
const userInfoCrud = require('../../models/user-info/user-info')

class User {
  constructor() {
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
  }
  // 用户注册中间件
  async register(req, res, next) {
    let { username, password } = req.body
    const createResult = await userCrud.create({ username, password })
    if (createResult) {
      res.send({
        code: 200,
        message: '用户注册成功!',
      })
    } else {
      res.send({
        code: 404,
        message: '用户注册失败!',
      })
    }
  }
  // 用户登录中间件
  async login(req, res, next) {
    const token = '-token'
    res.send({
      code: 200,
      data: {
        token: token,
      },
    })
  }
  // 获取用户信息中间件
  async getUserInfo(req, res, next) {
    let token = req.query.token
    token = token.split('-')[0]
    const result = await userInfoCrud.findOne(
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
