const userCrud = require('../../models/user/user')
const userInfoCrud = require('../../models/user-info/user-info')
const jwt = require('../../util/jwt')
const config = require('config-lite')

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
    try {
      console.log(req.result)
      const token = await jwt.sign(
        {
          userId: req.result._id,
        },
        config.jwtSecret,
        { expiresIn: 60 * 60 }
      )
      res.status(200).json({ token })
      // res.send({
      //   code: 200,
      //   data: {
      //     token: token,
      //   },
      // })
    } catch (error) {
      next(error)
    }
  }
  // 获取用户信息中间件
  async getUserInfo(req, res, next) {
    res.send({ code: 20000 })
  }
}

module.exports = new User()
