const { verify } = require('../util/jwt')
const config = require('config-lite')
const userCrud = require('../models/user/user')

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']
  console.log(token)
  // token = token ? token : null
  if (!token) {
    return res.status(401).end()
  }
  try {
    const decodedToken = await verify(token, config.jwtSecret)
    const result = await userCrud.findById(decodedToken.userId)
    console.log(result)
    next()
  } catch (error) {
    return res.status(401).end()
  }
}
