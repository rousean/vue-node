const { verify } = require('../util/jwt')
const config = require('config-lite')
const userCrud = require('../models/user/user')

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).end()
  }
  try {
    const decodedToken = await verify(token, config.jwtSecret)
    const result = await userCrud.findById(decodedToken.userId)
    next()
  } catch (error) {
    return res.status(401).end()
  }
}
