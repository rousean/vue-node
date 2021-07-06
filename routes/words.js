const express = require('express')
const router = express.Router()
const query = require('../db/mysql/mysql')

// 获取mysql的数据
router.get('/sql', async function (req, res, next) {
  let sql = req.query.sql
  let result = await query(sql, [])
  let words = JSON.parse(JSON.stringify(result))
  res.send({ code: 0, data: words })
})

// 获取所有书本标签
router.get('/bookLists', async function (req, res, next) {
  let result = await query(
    'select cover, bookOrigin, introduce, wordNum, reciteUserNum, title, tagName, secondTag, isHot from r_books_info',
    []
  )
  let r_books_info = JSON.parse(JSON.stringify(result))
  let tagNames = ['留学', '大学', '高中', '初中', '小学']
  let booksLists = []
  for (let i = 0; i < tagNames.length; i++) {
    let tagName = tagNames[i]
    let datas = r_books_info.filter(item => item['tagName'] === tagName)
    let secondTag = [...new Set(datas.map(item => item.secondTag))]
    let contents = []
    for (let j = 0; j < secondTag.length; j++) {
      let tag = secondTag[j]
      let data = datas.filter(item => item['secondTag'] === tag)
      let tagContent = data.map(item => ({
        cover: item.cover,
        bookOrigin: JSON.parse(item.bookOrigin),
        introduce: item.introduce,
        wordNum: item.wordNum,
        reciteUserNum: item.reciteUserNum,
        title: item.title,
        isHot: item.isHot,
      }))
      let content = {
        tag: tag,
        tagContent: tagContent,
      }
      contents.push(content)
    }
    let booksList = {
      tagName: tagName,
      secondTag: secondTag,
      contents: contents,
    }
    booksLists.push(booksList)
  }
  let hotContents = r_books_info
    .filter(item => item['isHot'] === '1')
    .map(item => ({
      cover: item.cover,
      bookOrigin: JSON.parse(item.bookOrigin),
      introduce: item.introduce,
      wordNum: item.wordNum,
      reciteUserNum: item.reciteUserNum,
      title: item.title,
      isHot: item.isHot,
    }))
  booksLists.unshift({
    tagName: '热门',
    secondTag: '',
    contents: [{ tag: '热门', tagContent: hotContents }],
  })
  res.send({ code: 0, data: booksLists })
})

module.exports = router
