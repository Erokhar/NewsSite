var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var mongoDB = 'mongodb+srv://admin:admin@cluster0.yuq97.mongodb.net/NewsSiteDB?retryWrites=true&w=majority'
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema

var users = new Schema({
  name:String
})
//var newsModel = mongoose.model('users', users);

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , hell: 'HELLSPAWN'});
});

router.post("/save",function(req,res,next){
  console.log(req.body["username"])
  var newsInstance = new newsModel({name:req.body["username"]});
  newsInstance.save(function (err) {
    if (err) return handleError(err);
  });
})*/

module.exports = router;
