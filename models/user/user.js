const mongoose = require('mongoose')
const mongoCrud = require('../../db/mongoose/mongo-crud')
const { encrypt } = require('../../utils/crypt')
const Schema = mongoose.Schema

// 定义schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: v => encrypt(v),
  },
})

// 定义model
const userModel = mongoose.model('user', userSchema, 'user')

// 定义class继承增删改查方法
class userCrud extends mongoCrud {
  constructor() {
    super(userModel)
  }
}

module.exports = new userCrud()
