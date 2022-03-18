let express = require('express');
let router = express.Router();
let controller = require('../controllers/incidents')

router.get('/', controller.list)

router.get('/create', controller.renderCreateForm)

router.get('/update/:id', controller.renderUpdateForm)

router.get('/delete/:id', controller.delete)

module.exports = router