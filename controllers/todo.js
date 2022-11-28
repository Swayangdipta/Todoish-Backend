const Todo = require('../models/todo')
// const _ = require("lodash")

exports.getTodoById = (req,res,next,id) =>{
    Todo.findById(id).exec((err,todo)=>{
        if(err){
            return res.status(400).json({error: "Faild to load todo!",body: err})
        }

        req.todo = todo
        next()
    })
}

exports.getTodo = (req,res) => {
    return res.json(req.todo)
}

exports.createTodo = (req,res,next) => {
    let todo = new Todo(req.body)

    todo.save((err,savedTodo)=>{
        if(err){
            return res.status(400).json({error: "Failed to save your todo!",body: err})
        }

        req.tempTodo = savedTodo
        next()
    })
}

exports.removeTodo = (req,res) => {
    let todo = req.todo

    todo.remove((err,deletedTodo)=>{
        if(err){
            return res.status(400).json({error: "Faild to delete todo!",body: err})
        }

        return res.json({todo: deletedTodo.title})
    })
}

exports.editTodoTask = (req,res) => {
    Todo.findByIdAndUpdate(req.todo._id,{tasks: req.body.tasks || req.todo.tasks,title: req.body.title || req.todo.title,isCompleted: req.body.isCompleted || false},(err,updatedTodo)=>{
        if(err){
            return res.status(400).json({error: "Faild to update todo. Refresh!",body: err})
        }

        return res.json(updatedTodo)
    })
}