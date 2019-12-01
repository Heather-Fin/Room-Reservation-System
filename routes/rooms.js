var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/RoomRezy');

router.get('/', function(req, res) {
    var collection = db.get('rooms');
    collection.find({}, function(err, rooms){
        if (err) throw err;
      	res.json(rooms);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('rooms');
    collection.findOne({ _id: req.params.id }, function(err, room){
        if (err) throw err;
      	res.json(room);
    });
});

module.exports = router;