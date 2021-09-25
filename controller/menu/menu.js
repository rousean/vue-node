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
  // 按页查询菜单
  async queryMenu(req, res, next) {
    try {
      const menu = await menuCrud.findAll(
        { is_delete: 0 },
        { _id: 1, parent_id: 1, path: 1, name: 1, component: 1, title: 1, icon: 1 }
      )
      const menuTree = menu.reduce((acc, cur, idx, list) => {
        if (cur.parent_id === 0) {
          acc.push({
            ...cur,
            children: list.filter(f => f.parent_id == cur._id),
          })
        } else {
          cur.children = ''
        }
        return acc
      }, [])
      res.status(200).json({ code: config.success, message: '获取成功!', data: menuTree })
    } catch (error) {
      next(error)
    }
  }

  // 根据id删除菜单
  async deleteMenu(req, res, next) {}

  // 新增菜单记录
  async createMenu(req, res, next) {}

  // 更新菜单记录
  async updateMenu(req, res, next) {}
}

module.exports = new Menu()
