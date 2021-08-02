const express = require('express')
const router = express.Router()
const User = require('../controller/user/user')

const userValidator = require('../validator/user')
const auth = require('../middleware/auth')

// 获取users路由监听
router.get('/', function (req, res, next) {
  res.send('')
})
// 用户注册接口
router.post('/register', userValidator.register, User.register)

// 登录接口
router.post('/login', userValidator.login, User.login)

// 用户信息接口
router.get('/info', auth, User.getUserInfo)

module.exports = router
