const loremIpsum = require('lorem-ipsum').loremIpsum
const mongoose = require('mongoose')
var db = mongoose.connection
const { init_project_list, status_array } = require('./Constants')

//models
const Project = require('../../models/Project')
const User = require('../../models/User')
const Category = require('../../models/Category')

//services
const projectService = require('../../controllers/service/projectService')

//functions
const { pickMultipleRandomElements } = require('./helperFunctions')

const permittedUsers = randomUsers => {
  permUsers = []
  randomUsers.forEach((element, index) => {
    permUsers.push(element)
    //add permittedUsers to authors & assignees contactlist and v.v.
  })
  return permUsers
}

exports.initProjectBase = async () => {
  init_user_ids = []
  await User.find().then(data => {
    data.forEach(user => {
      init_user_ids.push(user._id)
    })
  })

  init_category_ids = []
  await Category.find().then(data => {
    data.forEach(cat => {
      init_category_ids.push(cat._id)
    })
  })

  init_project_list.forEach(async (element, index) => {
    randomCategories = pickMultipleRandomElements(init_category_ids, 3)
    randomUsers = pickMultipleRandomElements(init_user_ids, 5)
    random_author = randomUsers[0]
    random_assignee = randomUsers[1]

    var project = new Project({
      _id: new mongoose.Types.ObjectId(),
      name: element,
      status: pickMultipleRandomElements(status_array, 1)[0],
      author: random_author,
      assignedTo: random_assignee,
      permittedUsers: permittedUsers(randomUsers),
      description: loremIpsum(80),
      categories: randomCategories,
      tasks: []
    })
    project.save()

    await projectService.addProjectToCategories(project._id, project.categories)

    await projectService.addProjectToAuthor(project._id, project.author)

    await projectService.addProjectToAssignee(project._id, project.assignedTo)

    await projectService.addProjectToPermittedUsers(
      project._id,
      project.permittedUsers
    )
  })
}
