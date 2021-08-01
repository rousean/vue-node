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
    const userId = await userCrud.findById(decodedToken.userId)
    if (userId) {
      next()
    } else {
      return res.status(401).end()
    }
  } catch (error) {
    return res.status(401).end()
  }
}
