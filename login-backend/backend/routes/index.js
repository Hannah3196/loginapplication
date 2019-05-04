var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var db = require("./config/mongoConnect");
var constant = require("./config/constant");
var url = constant.url;
/* GET home page. */
router.get('/getUsers', function (req, res, next) {
  var userList = [];
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var cursor = db.collection("User").find();
    cursor.forEach(function (film, err) {
      if (err) throw err;
      userList.push(film);
    }, function () {
      db.close();
      res.send(userList);
    })
  });
});
router.post('/addUser', function (req, res, next) {
  var status = {};
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    db.collection('User', function (err, collection) {
      var id = "U00" + Math.floor((Math.random() * 10) + 1);
      collection.insert({ id: id, name: req.body.name, email: req.body.email, password: req.body.password });
      db.collection('User').count(function (err, count) {
        if (err) throw err;
        console.log('Total Rows: ' + count);
        status = { "value": "success" };
        console.log("status",status);
      },function () {
        db.close();
        res.send(status);
      });
    });
  });
});
router.post('/checkUser', function (req, res, next) {
  var status = {};
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var cursor = db.collection("User").find({ "email": req.body.email, "password": req.body.password });
    cursor.forEach(function (value, err) {
      if (err) throw err;
      console.log("value", value);
      status = { "value": "success","data":value }
    }, function () {
      db.close();
      res.send(status);
    })
  });
});

module.exports = router;
