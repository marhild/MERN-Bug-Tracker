const mongoose = require('mongoose')
var db = mongoose.connection

//functios
const { initUserBase, initContacts } = require('./initUsers')
const { initCategoryList } = require('./initCategories')
const { initProjectBase} = require('./initProjects')
const { initTaskBase } = require('./initTasks')
const { waitForSeeder } = require('./helperFunctions')



const seedDB = async () => {
  db.dropDatabase()
  await initUserBase()
  await waitForSeeder(3000)
  await initContacts()
  await waitForSeeder(3000)
  await initCategoryList()
  await waitForSeeder(3000)
  await initProjectBase()
  await waitForSeeder(3000)
  await initTaskBase()
}
module.exports = seedDB
