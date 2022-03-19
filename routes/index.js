let express = require('express');
let router = express.Router();
let incidentsRouter = require('./incidents')

router.use('/incidents', incidentsRouter)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HelpPanda Incident Manager' });
});

module.exports = router;
