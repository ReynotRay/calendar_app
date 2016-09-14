var express = require('express');
var app = express();
var mongoose = require('mongoose');
//after mongod needed the b
mongoose.connect('mongodb://localhost/passport-rey');

require('./config/middleware.express')(app);
//needed app at end of line 9 to work correctly.
require('./config/routes.express')(app);
//routes

app.listen(8080, function (){
	console.log('listenting on port 8080');
});