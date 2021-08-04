/**
 * 方法一
 * 扁平数据结构转Tree
 * @param {*} items
 * @returns
 */
function arrayToTree(items) {
  const result = []
  const itemMap = {}
  for (const item of items) {
    const id = item._id
    const pid = item.parent_id
    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
        meta: {
          keepAlive: item.keep_alive,
          defaultMenu: item.default_menu,
          title: item.title,
          icon: item.icon,
          closeTab: item.close_tab,
        },
        menuId: id,
        authoritys: '',
        parameters: [],
      }
    }
    delete item.keep_alive
    delete item.default_menu
    delete item.title
    delete item.icon
    delete item.close_tab
    delete item.menu_level
    itemMap[id] = {
      ...item,
      menuId: itemMap[id]['menuId'],
      authoritys: itemMap[id]['authoritys'],
      meta: itemMap[id]['meta'],
      children: itemMap[id]['children'],
      parameters: itemMap[id]['parameters'],
    }
    const treeItem = itemMap[id]
    if (!itemMap[pid]) {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}

/**
 * 方法二
 * 扁平数据结构转Tree
 * Accumulator (acc) (累计器)
 * Current Value (cur) (当前值)
 * Current Index (idx) (当前索引)
 * Source Array (src) (源数组)
 * @param {*} arr
 */
function reduceTree(arr) {
  return arr.reduce((total, item, index, list) => {
    item['meta'] = {
      keepAlive: item.keep_alive,
      defaultMenu: item.default_menu,
      title: item.title,
      icon: item.icon,
      closeTab: item.close_tab,
    }
    item['menuId'] = item._id
    item['authoritys'] = ''
    item['parameters'] = []
    delete item.keep_alive
    delete item.default_menu
    delete item.title
    delete item.icon
    delete item.close_tab
    delete item.menu_level
    if (item.parent_id === 0) {
      total.push({
        ...item,
        children: list.filter(f => f.parent_id == item._id),
      })
    } else {
      item.children = list.filter(f => f.parent_id === item._id)
    }

    return total
  }, [])
}

module.exports = {
  arrayToTree,
  reduceTree,
}
