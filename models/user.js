const mongoose = require('mongoose')
const crypto = require('crypto')
const {v4} = require('uuid')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required."]
    },
    email: {
        type: String,
        required: [true,"Email is required."],
        unique: [true,"Email already exists."]
    },
    todos: [{
        type: ObjectId,
        ref: 'Todo'
    }],
    encryptedPassword: String,
    salt: String
},{timestamps: true})

userSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt = v4()
        this.encryptedPassword = this.encryptPassword(password);
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    authenticate: function(password){
        return this.encryptPassword(password) === this.encryptedPassword
    }
    ,
    encryptPassword: function(password){
        if(!password) return ''

        try {
            return crypto.createHmac("sha256",this.salt).update(password).digest('hex');
        } catch (error) {
            return ''
        }
    }
}

module.exports = mongoose.model("User",userSchema);