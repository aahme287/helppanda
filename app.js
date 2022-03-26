let express = require('express');
let path = require('path');
let logger = require('morgan');
let indexRouter = require('./routes/index');
let errorHandler = require('./middleware/error-handler.js');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(errorHandler);

// // error handler
app.use(function(err, req, res, next) {
  console.log('hereererere', err)
  // set locals, only providing error in development
  res.status(404).json({ 
      statusCode: 404, 
      message: "The endpoint does not exist."
    }
  );
});

module.exports = app;
