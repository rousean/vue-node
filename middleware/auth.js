const { verify } = require('../util/jwt')
const config = require('config-lite')

const expressJwt = require('express-jwt')

const userCrud = require('../models/user/user')

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).end()
  }
  const rousean = expressJwt({
    secret: config.jwtSecret,
    // credentialsRequired: false,
    // getToken: token,
  })
  console.log(rousean)

  try {
    const decodedToken = await verify(token, config.jwtSecret)
    const result = await userCrud.findById(decodedToken.userId)
    if (result) {
      next()
    } else {
      return res.status(401).end()
    }
  } catch (error) {
    return res.status(401).end()
  }
}
