// var express = require('express');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
// var passport = require('passport');
// var localStrategy = require('../auth/local.passport_strategy');
// var User = require('../api/user/user.model');

// module.exports = function(app) {
//     app.use(express.static('public'));
//     app.use(cookieParser());
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({
//         extended: false
//     }));
//     app.use(session({
//         secret: 'keyboard cat',
//         resave: false,
//         saveUninitialized: false
//     }));
//     app.use(passport.initialize());
//     app.use(passport.session());
    
//     localStrategy();

//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });

//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });

// };