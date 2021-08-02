const express = require('express')
const router = express.Router()

const Menu = require('../controller/menu/menu')

router.get('/', function (req, res, next) {
  res.send('')
})

router.post('/menuList', Menu.getMenu)

module.exports = router
