const mongodb = require('../../db/mongoose/mongoose')
const userCurd = require('./userModel')

const userEntitys = [
  {
    username: 'admin',
    password: '111111',
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  {
    username: 'editor',
    password: '111111',
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
]

userCurd.insertMany(userEntitys).then(result => console.log('create dao-->', result))
// crud.create(userEntity).then(result => console.log('create dao-->', result))
