let express = require('express');
let router = express.Router();
let controller = require('../controllers/incidents')

router.get('/', controller.list)

router.get('/create', controller.renderCreateForm)
router.post('/create', controller.create)

router.get('/update/:id', controller.renderUpdateForm)
router.post('/update/:id', controller.update)

router.get('/delete/:id', controller.delete)

module.exports = router