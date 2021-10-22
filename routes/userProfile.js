var express = require('express');
const sessions = require('express-session');
var router = express.Router();
var mongoose = require('mongoose')
var mongoDB = 'mongodb+srv://admin:admin@cluster0.yuq97.mongodb.net/NewsSiteDB?retryWrites=true&w=majority'
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema
var newsModel = require("../models/newsModel")
var userModel = require("../models/usersModel")
var user = new Object()

router.get("/userProfile",function(req,res,next){
    if(req.session.userid==null){
        res.redirect("/users/login")
    }
    
    userModel.findOne({_id:req.session.userid}).then(founduser=>{user = founduser})
    newsModel.find({author:req.session.userid}).sort({publishingDate:'desc'}).then(newsResults=>{
        res.render("userProfile",{title:req.session.username+"'s Profile",newsResults:newsResults,profileOwner:req.session.username,userBio:user.bio})
    })
})

router.post("/saveBio",function(req,res,next){
    if(req.body.userBio!= null && req.body.userBio!= ""){
        user.bio = req.body.userBio
        user.save(function (err) {
            if(err) {
                console.error('ERROR!');
            }
        })
        res.redirect("/users/userProfile")
    }
})

module.exports = router