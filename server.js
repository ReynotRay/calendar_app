var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//after mongod needed the b
mongoose.connect('mongodb://localhost/calendar_app');

app.use(jsonParser);

require('./config/middleware.express')(app);
//needed app at end of line 9 to work correctly.
require('./config/routes.express')(app);
//routes

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();

storage.add('fuckl');
storage.add('shits');
console.log(storage);

//app will use public directory as static
app.use(express.static('public'));
//app get
app.get('/items/', function(req, res) {
    res.json(storage.items);
});

//app post is to add to items
app.post('/items', jsonParser, function (req, res) {

    if (req.body) {
        var item = storage.add(req.body.name);
        res.status(201).json(item);
    } else {
        res.sendStatus(400);
    }
});

//to edit items 
app.put('/items/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var name = req.body.name;
    for (var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id === id) {
            storage.items[i].name = name;
            res.status(201).json(storage.items);
        }
    }
});

//to delete items.
app.delete('/items/:id', function (req, res) {
    var id = parseInt(req.params.id);
    for (var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id === id) {
            storage.items.splice(i, 1);
            res.status(201).json(storage.items);
        }
    }
}); 

app.listen(8080, function (){
	console.log('listenting on port 8080');
});


exports.app = app;
exports.storage = storage;