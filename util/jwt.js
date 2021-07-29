const jwt = require('jsonwebtoken')

// 转换函数返回Promise
const { promisify } = require('util')

exports.sign = promisify(jwt.sign)

exports.verify = promisify(jwt.verify)

exports.decode = promisify(jwt.decode)
