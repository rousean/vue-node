const createError = require('http-errors')

module.exports = function notFound(req, res, next) {
  next(createError(404, '访问不存在！'))
}
