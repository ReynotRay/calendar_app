var User = require('./user.model');

var Controller = {};

Controller.get = function(req, res) {
    console.log('you may be on to something mf');
    User.find({}, function(err, users){
        if(err) throw new Error('Something went wrong');
        res.status(200).json(users);
    });
};

Controller.create = function(req, res) {
    User.create({username: req.params.username, password: req.params.password}, function(err){
        if(err) {
            console.log(err);
        }

        res.status(201).end();
    });
};


module.exports = Controller;