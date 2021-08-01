const menuCrud = require('./menu')
require('../../db/mongoose/mongoose')

const objs = [
  {
    menu_level: 0,
    parent_id: '6106315485249442d84103a7',
    path: 'auth',
    name: 'auth',
    hidden: 0,
    component: 'views/system/auth/auth.vue',
    sort: 1,
    keep_alive: 0,
    default_menu: 0,
    title: '角色管理',
    icon: 'auth',
    close_tab: 0,
  },
  {
    menu_level: 0,
    parent_id: '6106315485249442d84103a7',
    path: 'menu',
    name: 'menu',
    hidden: 0,
    component: 'views/system/menu/menu.vue',
    sort: 2,
    keep_alive: 0,
    default_menu: 0,
    title: '菜单管理',
    icon: 'menu',
    close_tab: 0,
  },
  {
    menu_level: 0,
    parent_id: '6106315485249442d84103a7',
    path: 'user',
    name: 'user',
    hidden: 0,
    component: 'views/system/user/user.vue',
    sort: 3,
    keep_alive: 0,
    default_menu: 0,
    title: '用户管理',
    icon: 'user',
    close_tab: 0,
  },
]

menuCrud
  .insertMany(objs)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
