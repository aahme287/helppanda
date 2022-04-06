let express = require('express');
let router = express.Router();
let controller = require('../controllers/incidents')
let authenticate = require('../middleware/authenticate')

router.get('/', controller.list)

router.post('/create', authenticate, controller.create)

router.post('/update/:id', authenticate, controller.update)

router.get('/delete/:id', authenticate, controller.delete)

module.exports = router