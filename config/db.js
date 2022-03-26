let URI = require('./config').URI;

//Database setup
let mongoose = require('mongoose');

module.exports = function() {

    // Connect to the Database
    mongoose.connect(URI);

    let mongoDB = mongoose.connection;
   
    mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
    mongoDB.once('open', ()=>{
        console.log('Connected to MongoDB...');
    });

    return mongoDB;
}