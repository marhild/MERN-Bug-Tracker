const loremIpsum = require('lorem-ipsum').loremIpsum
const mongoose = require('mongoose')
var db = mongoose.connection

//models
const Project = require('../../models/Project')
const Task = require('../../models/Task')
//services
const taskService = require('../../controllers/service/taskService')
//functions
const { pickMultipleRandomElements } = require('./helperFunctions')
//constants
const {
  task_types_array,
  priority_array,
  status_array
} = require('./Constants')

const buildTasks = async (projectId, amount, projectPermittedUsers) => {
  for (var i = 0; i < amount; i++) {
    taskAuthor = pickMultipleRandomElements(projectPermittedUsers, 1)[0]
    TaskAssignee = pickMultipleRandomElements(projectPermittedUsers, 1)[0]

    task = await new Task({
      _id: new mongoose.Types.ObjectId(),
      title: loremIpsum(8),
      author: taskAuthor,
      assignedTo: TaskAssignee,
      project: projectId,
      description: loremIpsum(20),
      priority: pickMultipleRandomElements(priority_array, 1)[0],
      status: pickMultipleRandomElements(status_array, 1)[0],
      type: pickMultipleRandomElements(task_types_array, 1)[0]
    })
    task.save()
    //add task to author
    await taskService.addTaskToAuthor(task._id, taskAuthor)
    //add task to assignee
    await taskService.addTaskToAssignee(task._id, TaskAssignee)
    //add task to project
    await taskService.saveTaskToProject(projectId, task._id)
  }
}

exports.initTaskBase = async () => {
  projects = await Project.find()
  projects.forEach(async (project, index) => {
    buildTasks(project._id, 25, project.permittedUsers)
    project.save()
  })
}
