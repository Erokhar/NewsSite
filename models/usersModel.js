var mongoose = require('mongoose')
var Schema = mongoose.Schema
var users = new Schema({
    email:String,
    firstname:String,
    lastname:String,
    username:String,
    password:String,
    userId:String,
  })

module.exports = mongoose.model('users', users);
