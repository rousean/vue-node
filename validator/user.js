const { body } = require('express-validator')
const validate = require('../middleware/validate')
const userCrud = require('../models/user/user')

exports.register = validate([
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空!')
    .custom(async username => {
      const user = await userCrud.findOne({ username })
      if (user) {
        return Promise.reject('用户名已经存在!')
      }
    }),
  body('password').notEmpty().withMessage('密码不能为空!'),
])
