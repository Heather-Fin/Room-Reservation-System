var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account');

var monk = require('monk');
var db = monk('localhost:27017/RoomRezy');

// GET reservations 
router.get('/', function(req, res) {

  var collection = db.get('reservations');
  var roomCollection = db.get('rooms');

  // only show reservations made under the current user
  var searchCriteria = {}; 
  let currUser = req.user.username;

  // if user is admin, let them see all reservations
  if (currUser && currUser != "admin") searchCriteria.user = currUser;

  var roomsArr = [];

  // returns a sorted list of reservations based on date
  collection.find(searchCriteria, {sort: {"date": 1}}, function(err, reservations) {
      if (err) throw err;

      roomSearchCriteria = []; 
      reservations.forEach(function(reservation, idx){
      	roomSearchCriteria[idx] = reservation.room;
      });

      roomCollection.find({ '_id' : {$in : roomSearchCriteria} }, function(err, rooms){
    	res.render('reservations', { rooms: rooms, reservations: reservations, user : req.user, });
      });

  });
});

//insert new room reservation
router.post('/:id', function(req, res){

    //add date booked to room
    var roomCollection = db.get('rooms');
    roomCollection.findOneAndUpdate({_id: req.params.id}, {$push: {"reservations": req.body.date} }).then((updatedDoc) => {});

    var collection = db.get('reservations');
    collection.insert({
        user: req.user.username,
        room: req.params.id,
        date: req.body.date
    }, function(err, room){
        if (err) throw err;
        res.redirect('/reservations');
    });
});

// load edit a room reservation page
router.get('/:id', function(req, res){
  var collection = db.get('reservations');
  var roomCollection = db.get('rooms');
  collection.findOne({ _id: req.params.id }, function(err, reservation){
    if (err) throw err;
    roomCollection.findOne({ '_id' : reservation.room }, function(err, room){
      res.render('editReservation', { room: room, reservation: reservation, user: req.user});
    });
  });
});

// update reservation info
router.put('/:id', function(req, res){
    var collection = db.get('reservations');
    collection.findOneAndUpdate({_id: req.params.id}, {$set: {date: req.body.date} }).then((updatedDoc) => {});
    
    res.redirect('/reservations');
});

//delete room reservation
router.delete('/:id', function(req, res){
    var collection = db.get('reservations');

    removeDateFromRoom(req.params.id);

    collection.remove({ _id: req.params.id }, function(err, reservation){
        if (err) throw err;
        res.redirect('/reservations');
    });
});

// called during delete of reservation to remove the date from the room object
function removeDateFromRoom(roomID){

  var collection = db.get('reservations');
  var roomsCollection = db.get('rooms');

  collection.findOne({_id: roomID}, function(err, reservation){
        var roomID = reservation.room;
        roomsCollection.findOneAndUpdate({_id: roomID}, {$pull:{"reservations": reservation.date}}).then((updatedDoc) => {});
  });

}

module.exports = router;