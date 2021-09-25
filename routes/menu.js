const express = require('express')
const router = express.Router()

const Menu = require('../controller/menu/menu')

router.get('/', function (req, res, next) {
  res.send('')
})

// 获取路由列表
router.post('/menuList', Menu.getMenu)

// 菜单管理界面相关接口
// 查询菜单列表
router.post('/queryMenu', Menu.queryMenu)
// 删除菜单列表
router.post('/deleteMenu', Menu.deleteMenu)
// 新增菜单列表
router.post('/createMenu', Menu.createMenu)
// 更新菜单列表
router.post('/updateMenu', Menu.updateMenu)

module.exports = router
