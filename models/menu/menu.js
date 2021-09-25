const mongoose = require('mongoose')

const mongoCrud = require('../../db/mongoose/mongo-crud')
const baseModel = require('../base-model/base-model')

const Schema = mongoose.Schema

// 定义schema
const menuSchema = new Schema({
  ...baseModel,
  menu_level: {
    type: Number,
    required: true,
  },
  parent_id: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hidden: {
    type: Number,
    required: true,
    default: 0,
  },
  component: {
    type: String,
    required: true,
  },
  sort: {
    type: Number,
    required: true,
  },
  keep_alive: {
    type: Number,
    default: 0,
  },
  default_menu: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  close_tab: {
    type: Number,
    default: 0,
  },
  is_delete: {
    type: Number,
    default: 0,
  },
})

// 定义model
const menuModel = mongoose.model('menu', menuSchema, 'menu')

// 定义class继承增删改查方法
class menuCrud extends mongoCrud {
  constructor() {
    super(menuModel)
  }
}

module.exports = new menuCrud()
