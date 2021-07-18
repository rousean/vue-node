// 依赖
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

// 自定义中间件
const router = require('./routes/index') // 路由
require('./db/mongoose/mongoose') // 数据库
const notFound = require('./middleware/not-found') // 404错误
const errorHandle = require('./middleware/error-handle') // 其他错误处理

// 实例化app
const app = express()

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// 使用中间件
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 使用路由
router(app)

// 捕获404错误并重定向到错误处理
app.use(notFound)

// 错误处理
app.use(errorHandle)

module.exports = app
