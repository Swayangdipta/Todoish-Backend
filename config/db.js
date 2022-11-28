const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(conn => {
        console.log("DATABASE CONNECTED.");
    }).catch(err => {
        console.log("DATABASE CONNECTION FAILD");
        console.log(err);
    })
}

module.exports = connectDB