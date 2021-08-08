const config = require('config-lite')

const menuCrud = require('../../models/menu/menu')
const { reduceTree } = require('../../util/tree')

class Menu {
  constructor() {
    this.getMenu = this.getMenu.bind(this)
  }
  async getMenu(req, res, next) {
    try {
      const menu = await menuCrud.findAll()
      const menuTree = reduceTree(menu)
      res.status(200).json({ code: config.success, message: '获取成功!', data: menuTree })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Menu()
