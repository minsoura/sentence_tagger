var express = require('express');
var request = require('request');
var qs = require('querystring');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var EventEmitter = require('events');
var fifo = require('fifo');

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



// tagger page request
function tagging_document_queue(file_name) {
  var queue = new fifo();
  var in_stream = fs.createReadStream(file_name);
  var out_stream = new stream;
  var rl = readline.createInterface({'input':in_stream, 'output':out_stream});
  var queue_event = new EventEmitter();
  var tagger_object = {
    queue:queue,
    rl:rl,
    event: queue_event,
    counter:0,
    finished:false
  };
  tagger_object.fill_queue = function() {
    if (tagger_object.finished === false) {
      tagger_object.rl.resume();
    } else {
      // no more data to tag;
    };
  };
  rl.on('line', function(line) {
    tagger_object.counter += 1;
    rl.pause();
    var document_json = JSON.parse(line.trim());
    for (var i=0; i < document_json.length; i++) {
      var sentence_text = document_json[i];
      var sentence_id = String(tagger_object.counter) + '-' + String(i);
      if (sentence_text != "") {
        tagger_object.queue.push({sentence_text:sentence_text, sentence_id:sentence_id});
        tagger_object.event.emit('pushed');
      };
    };
  });
  rl.on('close', function() {
    tagger_object.finished = true;
  });
  return tagger_object;
};

//var file_name = './test.txt';
//var tag_reader = tagging_document_queue(file_name);

/*
app.get('/proxy/tag_read/', (req, res) => {
  var send_sentence = function() {
    var sentence_info = tag_reader.queue.shift();
    res.send(JSON.stringify(sentence_info));
  };
  // if queue is empty
  if (tag_reader.queue.length === 0) {
    if (tag_reader.finished === false) {
      tag_reader.event.once('pushed', send_sentence);
      tag_reader.fill_queue();
    } else {
      // no more data
      res.send(JSON.stringify({sentence_text:'no more data to tag', sentence_id:'0'}));
    };
  } else {
    send_sentence();
  };
});*/


app.get('/proxy/tag_save/', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://192.168.182.195:3004/";
  var json_string = req.query.save_data || 'null'; // 에러처리하기
  var save_data = JSON.parse(json_string);
  var sentence_id = save_data.sentence_id || "0";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tagging");
    var status = "";
    dbo.collection("news_5w1h").findOne({'sentence_id':sentence_id}, function(err, result) {
      if (err) throw err;
      if(result==null){
        dbo.collection("news_5w1h").insert(save_data, function(err2, inst_result){
          if (err) throw err;
          console.log(JSON.stringify(inst_result.ops[0]) + " was inserted into the db");
          status="inserted";
          res.send(status);
        });
      }else{
        dbo.collection("news_5w1h").updateOne(save_data, function(err3, result){
          if (err) throw err;
          console.log(JSON.stringify(inst_result.ops[0]) + " was newly updated and inserted into the db");
          status="updated";
          res.send(status);
        });
        res.send(status);
      }
      db.close();
    });
  });
});

app.get('/proxy/tag_read_by_id/', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://192.168.182.195:3004/";
  var sentence_id = req.query.sentence_id || "0";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tagging");
    var status = "";
    dbo.collection("news_5w1h").findOne({'sentence_id':sentence_id}, function(err, result) {
      if (err) throw err;
      if(result==null){ //저장된 값이 존재한다면
          if (err) throw err;
          console.log(JSON.stringify(inst_result.ops[0]) + " no values detected");
          status="no data";
          res.send(status);
      }else{ //저장된 값이 존재한다면
          console.log(JSON.stringify(inst_result.ops[0]) + " previously saved values detected");
          status="data detected";
          res.send(status);
      }
      db.close();
    });
  });
});

app.listen(11112, function() {
  console.log("Server Running at localhost:11112");
});
