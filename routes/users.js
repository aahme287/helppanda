let router = require('express').Router()
let controller = require('../controllers/users')

// POST /signup
router.post('/signup', controller.signup)

// POST /signin
router.post('/signin', controller.signin)

// GET /signout
router.get('/signout', controller.signout)

module.exports = router