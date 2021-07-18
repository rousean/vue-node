const { body } = require('express-validator')
const validate = require('../middleware/validate')
const userCrud = require('../models/user/user')
const { myCrypt } = require('../util/crypt')

exports.register = [
  validate([
    body('username').notEmpty().withMessage('用户名不能为空!'),
    body('password').notEmpty().withMessage('密码不能为空!'),
  ]),
  validate([
    body('username').custom(async username => {
      let result = await userCrud.findOne({ username })
      if (result) {
        return Promise.reject('该用户名已经存在!')
      }
    }),
  ]),
]

exports.login = [
  validate([
    body('username').notEmpty().withMessage('用户名不能为空!'),
    body('password').notEmpty().withMessage('密码不能为空!'),
  ]),
  validate([
    body('username').custom(async (username, { req }) => {
      let result = await userCrud.findOne({ username }, { username: 1, password: 1, _id: 1 })
      if (result) {
        req.result = result // 将数据挂载到请求对象中,后续的中间件也可以使用
      } else {
        return Promise.reject('用户名不存在!')
      }
    }),
  ]),
  validate([
    body('password').custom(async (password, { req }) => {
      if (myCrypt(password) !== req.result.password) {
        return Promise.reject('密码不正确!')
      }
    }),
  ]),
]
