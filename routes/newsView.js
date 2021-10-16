var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var mongoDB = 'mongodb+srv://admin:admin@cluster0.yuq97.mongodb.net/NewsSiteDB?retryWrites=true&w=majority'
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema
var newsModel = require("../models/newsModel")

router.get("/newsView",function(req,res,next){
    if(req.session.userid==null){
        res.redirect("/users/login")
    }
    newsModel.find({title:req.session.newsTitle, url:req.session.newsUrl}).then(resultNews=>{
        var news = resultNews[0]
        res.render("newsView",{title:news.title,newsContent:news.content})
    })
    
})

module.exports = router