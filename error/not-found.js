const createError = require('http-errors')
const notFound = function (req, res, next) {
  next(createError(404))
}

module.exports = notFound
