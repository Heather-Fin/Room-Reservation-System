var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account');

var monk = require('monk');
var db = monk('localhost:27017/RoomRezy');

router.get('/', function (req, res) {
  res.redirect('/page/1');
});

// homepage, loads rooms
router.get('/page/:page', function (req, res) {

  var collection = db.get('rooms');

  // pagination
  var perPage = 4;
  var page = req.params.page || 1;

  // Allows users to filter room list by size
  var searchCriteria = {};

  let size = req.query.size;
  let date = req.query.date;

  searchCriteria.deleted = "false";
  if (size) searchCriteria.size = size;
  if (date) searchCriteria.reservations = {"$ne": date};

  collection.count(searchCriteria, function(err, count){
      if (err) throw err;
      collection.find(searchCriteria, {skip: (perPage * page) - perPage, limit: perPage, sort: {"name": 1}}, function(err, rooms){
        res.render('index', { rooms: rooms, user : req.user, sizePicked: size, datePicked: date, current: page,
                    pages: Math.ceil(count / perPage) });
      });
  });

});

router.get('/register', function(req, res) {
  res.render('register', { user : req.user });
});

// checks if username already exists
router.post('/register/checkUsername', function(req, res){

  var collection = db.get('accounts');

  collection.findOne({'username' : req.body.username}, function(err, user){
    if (user){
      return res.status(200).send({result: 'exists'});
    }
  });

});

//insert a new user
router.post('/register', function(req, res) {

  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
        return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });

});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

// router.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.render('login', {result: "unsuccessful"});} //res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/');
//     });
//   })(req, res, next);
// });

// router.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login'
//                                     }));

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// show new room entry page
router.get('/rooms/new', function(req, res) {
	res.render('new', { user: req.user });
});

// show room details
router.get('/rooms/:id', function(req, res) {
    var collection = db.get('rooms');
    collection.findOne({ _id: req.params.id }, function(err, room){
        if (err) throw err;
      	res.render('show', { room: room, user: req.user});
    });
});

//edit page
router.get('/rooms/:id/edit', function(req, res) {
    var collection = db.get('rooms');
    collection.findOne({ _id: req.params.id }, function(err, room){
        if (err) throw err;
      	res.render('edit', { room: room, user: req.user});
    });
});

//insert room
router.post('/rooms', function(req, res){
    var collection = db.get('rooms');
    collection.insert({
        name: req.body.name,
        size: req.body.size,
        image: req.body.image,
        reservations: [],
        deleted: "false"
    }, function(err, room){
        if (err) throw err;
        res.redirect('/');
    });
});

//update room
router.put('/rooms/:id', function(req, res){
    var collection = db.get('rooms');
    collection.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.name, size: req.body.size, image: req.body.image} }).then((updatedDoc) => {});
    
    res.redirect('/');
});

//SOFT delete of room
router.delete('/rooms/:id', function(req, res){
    var collection = db.get('rooms');
    collection.findOneAndUpdate({ _id: req.params.id }, {$set: {deleted: "true"} }).then((updatedDoc) => {});

    res.redirect('/');
});

module.exports = router;
