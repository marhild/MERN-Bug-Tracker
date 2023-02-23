const router = require('express').Router()
const contactController = require('../controllers/contact')
const passport = require('passport')

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  contactController.list
)
router.get(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  contactController.details
)
module.exports = router