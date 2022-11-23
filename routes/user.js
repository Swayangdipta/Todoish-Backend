const router = require('express').Router()
const { loginUser, registerUser, getUserById, getUser, logout } = require('../controllers/user')

router.param('userId',getUserById)

// User Routes
router.get('/user/:userId',getUser)

// Authentication Routes
router.post('/login',loginUser);
router.post('/register',registerUser)
router.get('/logout',logout)

module.exports = router