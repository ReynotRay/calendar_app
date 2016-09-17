var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//ex
var cookieParser = require('cookie-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//after mongod needed the b
mongoose.connect('mongodb://localhost/calendar_app');

app.use(jsonParser);

// require('./config/middleware.express')(app);
//needed app at end of line 9 to work correctly.
// require('./config/routes.express')(app);
//routes
var routes = require('./routes/index');
var users = require('./routes/users');
//passport init
app.use(passport.initialize());
app.use(passport.session());

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = { name: name, id: this.id };
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
//storage = ('beans');
console.log(storage);

//app will use public directory as static
app.use(express.static(path.join(__dirname, 'public')));

//app get
app.get('/items/', function(req, res) {
    res.json(storage.items);
});

//app post is to add to items
app.post('/items', jsonParser, function(req, res) {

    if (req.body) {
        var item = storage.add(req.body.name);
        res.status(201).json(item);
    } else {
        res.sendStatus(400);
    }
});

//to edit items 
app.put('/items/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var name = req.body.name;
    for (var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id === id) {
            storage.items[i].name = name;
            res.status(201).json(storage.items);
        }
    }
});




// Connect Flash
//app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  // res.locals.success_msg = req.flash('success_msg');
  // res.locals.error_msg = req.flash('error_msg');
  // res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//to delete items.
app.delete('/items/:id', function(req, res) {
    var id = parseInt(req.params.id);
    for (var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id === id) {
            storage.items.splice(i, 1);
            res.status(201).json(storage.items);
        }
    }
});

app.listen(8080, function() {
    console.log('listenting on port 8080');
});




exports.app = app;
exports.storage = storage;

app.use('/', routes);
app.use('/users', users);


