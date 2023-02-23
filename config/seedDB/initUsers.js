const loremIpsum = require('lorem-ipsum').loremIpsum
const mongoose = require('mongoose')
var crypto = require('crypto')
const { init_users_list } = require('./Constants')
var db = mongoose.connection

const User = require('../../models/User')
const Token = require('../../models/Token')

//functions
const { pickMultipleRandomElements } = require('./helperFunctions')
const userService = require('../../controllers/service/userService')

exports.initUserBase = () => {
  //password is always "password"
  init_users_list.forEach((element, index) => {
    email = element.replace(/\s/g, '') //trim spaces

    var user = new User({
      _id: new mongoose.Types.ObjectId(),
      isVerified: true,
      author_of_projects: [],
      author_of_tasks: [],
      assigned_to_tasks: [],
      assigned_to_projects: [],
      permittedProjects: [],
      contacts: [],
      name: element,
      bio: loremIpsum(20),
      email: `${email}@gmail.com`,
      password: '$2b$10$Suajx6R2RTRvl1GRQJNQtu28zGbaLZTDIj9oUKoQw9xFkRvEqhnkG',
      avatar:
        'https://react.semantic-ui.com/images/avatar/large/matthew.png'
    })
    user.save()

    var userToken = new Token({
      _id: new mongoose.Types.ObjectId(),
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex')
    })
    userToken.save()
  })
}

exports.initContacts = async () => {
  init_user_ids = []
  await User.find().then(data => {
    data.forEach((user, index) => {
      init_user_ids.push(user._id)
    })
  })
  init_user_ids.forEach((userId, index) => {
    randomContacts = pickMultipleRandomElements(init_user_ids, 7)
    randomContacts.forEach(async (randomContact, index) => {
      await userService.addUserToContacts(userId, randomContact)
    })
  })
}
