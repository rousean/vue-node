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
      res.status(200).json({ message: '用户注册成功!' })
    } catch (err) {
      next(err)
    }
  }
  // 用户登录中间件
  async login(req, res, next) {
    try {
      const token = await jwt.sign({ userId: req.result._id }, config.jwtSecret, {
        expiresIn: config.expiresIn,
      })
      res.status(200).json({ token: token })
    } catch (err) {
      next(err)
    }
  }
  // 获取用户信息中间件
  async getUserInfo(req, res, next) {
    res.status(200).json({})
  }
}

module.exports = new User()
