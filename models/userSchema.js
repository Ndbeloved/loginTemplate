const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    value:{
        type: String,
        default: 'none',
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 5 * 60000),  //In 5minutes time
    }
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    confirmedEmail: {
        type: Boolean,
        default: false,
    },
    otp: otpSchema,
})

UserSchema.pre('save', function(next){
    //handles token generation
    const generateToken = ()=>{
        const min = Math.pow(10, 4)
        const max = Math.pow(10, 5) - 1
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    const tokenString = generateToken().toString()
    
    this.otp = {
        value: tokenString,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 300000) //expires in 5minutes
    }
    next()
})

module.exports = mongoose.model('user', UserSchema)