let router = require('express').Router()
let controller = require('../controllers/users')
const { route } = require('./incidents')
let authenticate = require('../middleware/authenticate')
let jwt  = require('jsonwebtoken')

router.get('/profile', authenticate, (req, res) => {
    res.json({
        success: true,
        message: 'all good, access granted'
    })
})

// POST /signup
router.post('/signup', controller.signup)

// POST /signin
router.post('/signin', controller.signin)

// GET /signout
router.get('/signout', controller.signout)

module.exports = router