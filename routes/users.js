const express = require('express')
const router = express.Router()
const User = require('../controller/user/user')

// 获取users路由监听
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

// 登录接口
router.post('/login', User.login)

// 用户信息接口
router.get('/info', User.getUserInfo)

module.exports = router
