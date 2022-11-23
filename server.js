const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config()

// Route imports
const userRoutes = require('./routes/user')
const todoRoutes = require('./routes/todo')

// Initializing Express
const app = express()

// PORT for server to listen
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Database Connection
connectDB();


// Configuring routes
app.use('/api',userRoutes)
app.use('/api',todoRoutes)

// Starting Server / Server is listening to PORT
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}....`);
})