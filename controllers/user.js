const User = require('../models/user');
const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')

exports.getUserById = (req,res,next,id) => {
    User.findById(id)
    .populate('todos')
    .exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({error: "Faild to load user.",body: err})
        }

        req.profile = user
        next()
    })
}

exports.getUser = (req,res) => {
    req.profile.encryptedPassword = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}


exports.registerUser = (req,res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({error: "All fields are required",body: ''})
    }

    let user = new User(req.body);

    user.save((err,savedUser)=>{
        if(err){
            return res.status(400).json({error: "Faild to register!",body: err})
        }

        const {_id,name,email} = savedUser
        return res.json({
            user: {
                _id,
                name,
                email
            }
        })
    })
}

exports.loginUser = (req,res) => {
    let {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({error: "All fields are required",body: ''})
    }

    User.findOne({email}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({error: "No user found.",body: err})
        }

        if(!user.authenticate(password)){
            return res.status(400).json({error: "Email or password is incorrect",body: ''})
        }

        const token = jwt.sign({_id: user._id},process.env.SECRET)
        res.cookie("token",token,{expire: new Date(Date.now()+2.592e+9)})
        const {_id,name,email} = user
        return res.json({
            token,
            user:{
                _id,
                name,
                email
            }
        })
    })
}

exports.logout = (req,res) =>{
    res.clearCookie("token")
    res.json({
        message: "User signout success"
    })
}

exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    algorithms: ['SHA256','HS256',"sha1"],
    userProperty: "auth"
})

exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker) {
        return res.status(400).json({error: "Unauthorized!",body: "User is not authenticated"})
    }
    next()
}

exports.pushTodoInUser = (req,res) => {
    User.findByIdAndUpdate(req.profile._id,
        {$push: {"todos": req.tempTodo._id}},
        {upsert: true,new: true,safe: true},
        (err,updatedUser) => {
            if(err){
                return res.status(400).json({error: "Faild to add todo in your collection!",body: err})
            }

            return res.json({todos: updatedUser.todos,todoId: req.tempTodo._id})
        }
        )
}

exports.popTodoFromUser = (req,res,next) => {
    User.findByIdAndUpdate(req.profile._id,
            {$pull: {"todos": req.todo._id}},
            {new: true,upsert: true},
            (err,updatedUser) => {
                if(err){
                    return res.status(400).json({error: "Faild to remove todo from your todos!",body: err})
                }
                next()
            }
        )
}