const router = require('express').Router()
const imagesController = require('../controllers/images')
const passport = require('passport')

// /api/images
router.get('/user/:_id', 
passport.authenticate('jwt', { session: false }),
imagesController.getProfileImage)

module.exports = router