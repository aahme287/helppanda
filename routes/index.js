let express = require('express');
let router = express.Router();
let incidentsRouter = require('./incidents')
let userRouter = require('./users')

router.use('/users', userRouter)
router.use('/incidents', incidentsRouter)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'Please use API to access data'})
});

module.exports = router;
