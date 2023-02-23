const { init_category_list } = require('./Constants')
const Category = require('../../models/Category')
const mongoose = require('mongoose')

exports.initCategoryList = () => {

  init_category_list.forEach(element => {
    category = new Category({
      _id: new mongoose.Types.ObjectId(),
      name: element,
      projects: []
    })
    category.save()
  })
}
