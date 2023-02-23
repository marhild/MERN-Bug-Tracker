const router = require('express').Router()
const passport = require('passport')

const userController = require('../controllers/user')

// '/api/users'
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.getAllUsers
)


module.exports = router
