const User = require('../models/User')

mongoose = require('mongoose').set('debug', false)

// @route    GET api/contacts
// @desc     Get all contacts
// @access   Private
exports.list = async (req, res) => {
  try {
    const users = await User.find().select(['_id', 'name', 'email', 'contacts']);
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

// @route    GET api/contacts/:id
// @desc     Get contact by Id
// @access   Private
exports.details = async (req, res) => {
  try {
    const contact = await User.findOne({
      _id: req.params._id
    })
      .populate('contacts', 'name')
      .populate('contacts', 'email')

    if (!contact) {
      console.log('contact not found')
      return res.status(404).send({ message: 'Contact not found' })
    }

    res.status(200).send(project)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}
