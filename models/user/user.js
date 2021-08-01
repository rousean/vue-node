const mongoose = require('mongoose')
const mongoCrud = require('../../db/mongoose/mongo-crud')
const { myCrypt } = require('../../util/crypt')
const baseModel = require('../base-model/base-model')

const Schema = mongoose.Schema

// 定义schema
const userSchema = new Schema({
  ...baseModel,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    set: v => myCrypt(v),
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
