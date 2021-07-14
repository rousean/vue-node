const { validationResult } = require('express-validator')

module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const [{ msg }] = errors.errors
    // res.status(404).json({ errors: errors.array() })
    res.send({
      code: 404,
      message: msg,
    })
  }
}
