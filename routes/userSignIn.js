var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var mongoDB = 'mongodb+srv://admin:admin@cluster0.yuq97.mongodb.net/NewsSiteDB?retryWrites=true&w=majority'
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema
var usersModel = require("../models/usersModel")

router.get("/signin",function(req,res,next){
    var errmessage = {}
    errmessage["erremail"] = false
    errmessage["errfirstname"] = false
    errmessage["errlastname"] = false
    errmessage["errusername"] = false
    errmessage["errpassword"] = false
    res.render("signin",{ title: 'Sign In',message:errmessage})
})

router.post("/signinuser",function(req,res,next){
    var email = req.body["email"]
    var firstname = req.body["firstname"]
    var lastname = req.body["lastname"]
    var username = req.body["username"]
    var password = req.body["password"]
    var errmessage = {}
    errmessage["erremail"] = false
    errmessage["errfirstname"] = false
    errmessage["errlastname"] = false
    errmessage["errusername"] = false
    errmessage["errpassword"] = false
    errmessage["errwronguserpass"] = false

    if(email == ''){
        errmessage["erremail"] = true
    }
    if(firstname == ''){
        errmessage["errfirstname"] = true
    }    
    if(lastname == ''){
        errmessage["errlastname"] = true
    }
    if(username == ''){
        errmessage["errusername"] = true
    }    
    if(password == ''){
        errmessage["errpassword"] = true
    }

    if(errmessage["erremail"] || errmessage["errfirstname"] || errmessage["errlastname"] || errmessage["errusername"] || errmessage["errpassword"]){
        res.render("signin",{title:'Sign In',message:errmessage})
        return
    }

    usersModel.create({ firstname: firstname,lastname:lastname,email:email,username:username,password:password }, function (err, awesome_instance) {
        if (err) {
            res.render("error",{title:"error",message:err})
            return handleError(err);
        }
    })

    //res.set("userid",usersModel._id);
    res.render('login', { title: 'Log In',message:errmessage});

})


module.exports = router