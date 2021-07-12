const mongoose = require('mongoose')
const mongoCrud = require('../../db/mongoose/mongo-crud')

const Schema = mongoose.Schema

// 定义schema
const userInfoSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
  introduction: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

// 定义model
const userInfoModel = mongoose.model('userInfo', userInfoSchema, 'userInfo')

// 定义class继承增删改查方法
class userInfoCrud extends mongoCrud {
  constructor() {
    super(userInfoModel)
  }
}

module.exports = new userInfoCrud()
