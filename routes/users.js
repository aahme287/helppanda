let router = require('express').Router()
let controller = require('../controllers/users')
let authenticate = require('../middleware/authenticate')

router.get('/profile', authenticate, (req, res) => {
    res.json({
        success: true,
        message: 'all good, access granted',
        user: req.user
    })
})

// POST /signup
router.post('/signup', controller.signup)

// POST /signin
router.post('/signin', controller.signin)

// 
router.put('/:id', controller.update)

// GET /signout
// router.get('/signout', controller.signout)

module.exports = router