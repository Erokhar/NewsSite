var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var mongoDB = 'mongodb+srv://admin:admin@cluster0.yuq97.mongodb.net/NewsSiteDB?retryWrites=true&w=majority'
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema
var newsModel = require("../models/newsModel")

router.get('/newNews', function(req, res, next) {
    var errmessage = {}
    errmessage["errnewstitle"] = false
    errmessage["errnewsbody"] = false
    if(req.session.userid==null){
        res.redirect("/users/login")
    }
    res.render('newsInput', { title: 'Write a News Article',message:errmessage });
});

router.post('/saveNews',function(req,res,next){
    var errmessage = {}
    errmessage["errnewstitle"] = false
    errmessage["errnewsbody"] = false
    var newsTitle = req.body.newsTitle
    var newsBody = req.body.newsBody
    console.log(req.body)
    if(newsTitle == null || newsTitle==""){
        errmessage["errnewstitle"] = true
    }
    if(newsBody == null || newsBody==" "){
        errmessage["errnewsbody"] = true
    }
    
    if(errmessage["errnewstitle"] || errmessage["errnewsbody"]){
        res.render("newsInput",{title:'Write a News Article',message:errmessage})
        return
    }else{
        newsModel.create({title:newsTitle,content:newsBody,author:req.session.userid,publishingDate:new Date()},function(err,news){
            if (err) {
                res.render("error",{title:"error",message:err})
                return handleError(err);
            }
        })
    }
// Add a redirect to a news reading page
})

module.exports = router