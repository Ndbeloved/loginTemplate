const path = require('path')
const jwt = require('jsonwebtoken')
const sendMail = require('./libs/mail')
const UserModel = require('../models/userSchema')

const homePageController = async(req, res)=>{
    res.status(200).json({"message": "backend is up"});
}

const loginController = async(req, res)=>{
    res.json({"status": 200, "message": "login auth"})
}

const signUpController = async(req, res)=>{
    try{
        const {username, email, password} = req.body
        //packs user info for jwt signing
        const user = {
            username: username,
            email: email,
            role: 'regular',
        }

        //saves user to db
        const saveUser = await UserModel.create({
            username,
            password,
            email,
        })

        const otp = saveUser.otp.value


        const token = jwt.sign(user, process.env.JWT_SECRET)
        sendMail(otp, email, username)
        res.json({"status": 200, "message": "signup auth", 'token': token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message": "Internal server Error"})
    }
}

const verifyEmailController = async(req, res)=>{
    const email = req.params.email
    const id = req.params.id.toString();
    const user = await UserModel.findOne({email: email})
    const findOtp = user.otp.value
    if(!findOtp || findOtp != id) return res.status(401).json({"message": "Invalid Otp"})
    await UserModel.findOneAndUpdate({email: email}, {$set: {confirmedEmail: true}})
    res.status(404).json({"message": "User verified successfully"})
}


module.exports = {homePageController, loginController, signUpController, verifyEmailController}