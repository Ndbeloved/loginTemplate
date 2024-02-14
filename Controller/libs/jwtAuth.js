const jwt = require('jsonwebtoken')
const UserModel = require('../../models/userSchema')
module.exports = (req, res, next)=>{
    let authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, async(err, user)=>{
        if(err) return res.status(401).json({"message": "Bad Token"})
        req.user = user
        //find and check if users Email is confirmed
        const userDb = await UserModel.findOne({email: user.email})
        if(!userDb || !userDb.confirmedEmail) return res.status(401).json({"message": "Unverfied email"})
        next()
    })
}