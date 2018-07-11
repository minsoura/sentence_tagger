var express = require('express');
var request = require('request');
var qs = require('querystring');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

// create server
var app = express();

// allow CORS request
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// navbar request
app.get('/proxy/nav/:searchTerm', (req, res) => {

  var QUERY = req.params.searchTerm; // not using 'escape function';
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://192.168.182.195:3004/test'";
  console.log("SERVER_INCOMINGS:" + req);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("news_eval");
    var mquery = {'name':QUERY};
    var status = "";
    dbo.collection("companies_of_ints").findOne(mquery, function(err, result) {
      if (err) throw err;
      if(result==null){
        dbo.collection("companies_of_ints").insert(mquery, function(err2, inst_result){
          if (err2) throw err2;
          console.log(JSON.stringify(inst_result.ops[0].name) + "was inserted into the db");
          status='inserted';
          res.send(status);
        });
      }else{
        status='already exists';
        res.send(status);
      }

      db.close();
    });
  });

});

app.get('/proxy/navd/:searchTerm', (req, res) => {

  var QUERY = req.params.searchTerm; // not using 'escape function';
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://192.168.182.195:3004/test'";
  console.log("SERVER_INCOMINGS:" + req);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("news_eval");
    var mquery = {'name':QUERY};
    var status = "";
    dbo.collection("companies_of_ints").remove(mquery, function(err, result) {
      if (err) throw err;
      var json = JSON.parse(result);
      console.log("REMOVE_status:" + json['ok']);
      console.log("REMOVE_number:" + json['ok']);
      if(json['ok']==1 && json['n']==1){
        res.send('removed');
      }
      db.close();
    });
  });

});


app.get('/proxy/company/:searchTerm', (req, res) => {
  var QUERY = req.params.searchTerm; // not using 'escape function';
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://192.168.182.195:3004/test'";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("news_eval");
    var mquery = {'name':QUERY};
    var status = "";
    dbo.collection("companies_of_ints").findOne(mquery, function(err, result) {
      if (err) throw err;
      if(result==null){
        dbo.collection("companies_of_ints").insert(mquery, function(err2, inst_result){
          if (err2) throw err2;
          console.log(JSON.stringify(inst_result.ops[0].name) + "was inserted into the db");
          status="inserted";
          res.send(status);
        });
      }else{
        status="already exists";
        res.send(status);
      }

      db.close();
    });
  });
});





var zmq = require('zeromq');

app.get('/proxy/sa/:searchTerm', (req, res) => {
  var requester = zmq.socket('req');
  var QUERY =   req.params.searchTerm; // not using 'escape function';
  console.log(QUERY+"proxy")
  requester.connect("tcp://192.168.182.195:5555");
  requester.send(QUERY.toString());
  requester.on("message", function(reply){
    console.log("receiver: ", reply.toString());
    res.send(reply.toString());
  });
});


app.listen(11112, function() {
  console.log("Server Running at localhost:11112");
});
