const config = require('config-lite')

const userCrud = require('../../models/user/user')
const jwt = require('../../util/jwt')

class User {
  constructor() {
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
  }
  // 用户注册中间件
  async register(req, res, next) {
    let { username, password } = req.body
    try {
      await userCrud.create({ username, password })
      res.status(200).json({ code: config.success, message: '用户注册成功!' })
    } catch (err) {
      res.status(200).json({ code: config.error, message: '用户注册失败!' })
    }
  }

  // 用户登录中间件
  async login(req, res, next) {
    try {
      const token =
        'Bearer ' +
        (await jwt.sign({ userId: req.result._id }, config.jwtSecret, {
          expiresIn: config.expiresIn,
        }))
      res
        .status(200)
        .json({ code: config.success, message: '用户登录成功!', data: { token: token } })
    } catch (err) {
      res.status(200).json({ code: config.error, message: '用户登录失败!', data: { token: null } })
    }
  }

  // 获取用户信息中间件
  async getUserInfo(req, res, next) {
    res.status(200).json({ data: '成功获取' })
  }
}

module.exports = new User()
