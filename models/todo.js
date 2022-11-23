const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"Title is required."]
    },
    tasks: [{
        type: String
    }]
},{timestamps: true})


module.exports = mongoose.model("Todo",todoSchema);