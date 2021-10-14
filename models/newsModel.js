var mongoose = require('mongoose')
var Schema = mongoose.Schema
var news = new Schema({
    title:String,
    content:String,
    author:String,
    publishingDate:Date,
    url:String,
    likes:[String],
    dislikes:[String],
    Comments:[String]
  })

module.exports = mongoose.model('news', news);
