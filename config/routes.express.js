// var userRouter = require('../api/user/user.router');
// var passport = require('passport');

// module.exports = function(app) {

//     app.get('/welcome', function(req, res) {
//         res.json({
//             message: 'You are logged in',
//             user: req.user,
//             cookie: req.cookies
//         });
//     });


//     app.post('/login',
//         passport.authenticate('local', {
//             successRedirect: '/welcome',
//             failureRedirect: '/login'
//         }));

//     app.use('/users', userRouter);
// };