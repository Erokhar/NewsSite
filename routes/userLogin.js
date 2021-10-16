var express = require('express');
const sessions = require('express-session');
var router = express.Router();
var mongoose = require('mongoose')
var mongoDB = 'mongodb+srv://admin:admin@cluster0.yuq97.mongodb.net/NewsSiteDB?retryWrites=true&w=majority'
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema
var usersModel = require("../models/usersModel")

router.get("/login",function(req,res,next){
    var errmessage = {}
    errmessage["errusername"] = false
    errmessage["errpassword"] = false
    res.render("login",{title:"Log In",message:errmessage})
})

router.post("/loginuser",function(req,res,next){
    var errmessage = {}
    errmessage["errusername"] = false
    errmessage["errpassword"] = false
    errmessage["errwronguserpass"] = false
    var username = req.body["username"]
    var password = req.body["password"]

    if(username == ''){
        errmessage["errusername"] = true
    }    
    if(password == ''){
        errmessage["errpassword"] = true
    }

    if(errmessage["errusername"] || errmessage["errpassword"]){
        res.render("login",{title:'Sign In',message:errmessage})
        return
    }

    usersModel.find({username:username}).then(users=>{
        var user = users[0]

        if(password!=user.password){
            console.log("no match")
            errmessage["errwronguserpass"] = true
            res.render("login",{title:"Log In",message:errmessage})
            
        }
        else{
            console.log("match found")
            req.session.userid = user._id
            //res.set("userid",user._id)
            res.redirect("/news/newNews")
            
        }
    })
    
})

module.exports = router