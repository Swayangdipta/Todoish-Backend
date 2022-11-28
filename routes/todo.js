const { getTodoById, createTodo, removeTodo, getTodo, editTodoTask } = require('../controllers/todo')
const { getUserById, isSignedIn, pushTodoInUser, isAuthenticated, popTodoFromUser } = require('../controllers/user')

const router = require('express').Router()

router.param('todoId',getTodoById)
router.param('userId',getUserById)

router.get('/todo/:todoId',getTodo)
router.post('/todo/create/:userId',isSignedIn,createTodo,pushTodoInUser)
router.put('/todo/edit/:userId/:todoId',isSignedIn,isAuthenticated,editTodoTask)
router.delete('/todo/delete/:userId/:todoId',isSignedIn,isAuthenticated,popTodoFromUser,removeTodo)


module.exports = router