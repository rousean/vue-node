const config = require('config-lite')

const menuCrud = require('../../models/menu/menu')

class Menu {
  constructor() {
    this.getMenu = this.getMenu.bind(this)
  }
  async getMenu(req, res, next) {
    const menu = await menuCrud.findAll()
    res.status(200).json({ code: config.success, message: '获取成功!', data: menu })
  }
}

module.exports = new Menu()
