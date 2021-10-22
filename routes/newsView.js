var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var mongoDB = 'mongodb+srv://admin:admin@cluster0.yuq97.mongodb.net/NewsSiteDB?retryWrites=true&w=majority'
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema
var newsModel = require("../models/newsModel")
var newsid=null
var pageNews = new Object()
router.get("/newsView",function(req,res,next){
    if(req.session.userid==null){
        res.redirect("/users/login")
    }
    newsModel.find({title:req.session.newsTitle, url:req.session.newsUrl}).then(resultNews=>{
        var news = resultNews[0]
        res.render("newsView",{title:news.title.toUpperCase()+" By "+req.session.username.toUpperCase(),newsContent:news.content,likesSize:news.likes.length,dislikesSize:news.dislikes.length})
    })
    
})

router.post("/selectNews",function(req,res,next){
    newsid = req.body.newsid
    if(req.session.userid==null){
        res.redirect("/users/login")
    }
    if(newsid!=null && newsid!=""){
        newsModel.findOne({_id:newsid}).then(results=>{
            pageNews = results
            res.render("newsView",{title:results.title.toUpperCase()+" By "+req.session.username.toUpperCase(),newsContent:results.content,likesSize:pageNews.likes.length,dislikesSize:pageNews.dislikes.length})
        })
    }
})


router.get("/mainView",function(req,res,next){
    if(req.session.userid==null){
        res.redirect("/users/login")
    }
    newsModel.find().limit(20).sort({publishingDate:'desc'}).then(newsResults=>{
        res.render("mainView",{title:"News Articles by Users",newsResults:newsResults})
    })
})

router.post("/likeNews",function(req,res){
    for(let like in pageNews.likes){
        if(req.session.userid==pageNews.likes[like]){
            req.session.newsTitle = pageNews.title
            req.session.newsUrl = pageNews.url
            res.redirect("/news/newsView")
            return
        }
    }
    for(let like in pageNews.dislikes){
        if(req.session.userid==pageNews.dislikes[like]){
            pageNews.dislikes.splice(like,1)
            break
        }
    }
    pageNews.likes.push(req.session.userid)
    pageNews.save(function (err) {
        if(err) {
            console.error('ERROR!')
            console.error(err)
        }
    })
    req.session.newsTitle = pageNews.title
    req.session.newsUrl = pageNews.url
    res.redirect("/news/newsView")
})

router.post("/dislikeNews",function(req,res){
    for(let like in pageNews.dislikes){
        if(req.session.userid==pageNews.dislikes[like]){
            req.session.newsTitle = pageNews.title
            req.session.newsUrl = pageNews.url
            res.redirect("/news/newsView")
            return
        }
    }
    for(let like in pageNews.likes){
        if(req.session.userid==pageNews.likes[like]){
            pageNews.likes.splice(like,1)
            break
        }
    }
    pageNews.dislikes.push(req.session.userid)
    pageNews.save(function (err) {
        if(err) {
            console.error('ERROR!')
            console.error(err)
        }
    })
    req.session.newsTitle = pageNews.title
    req.session.newsUrl = pageNews.url
    res.redirect("/news/newsView")
})

module.exports = router