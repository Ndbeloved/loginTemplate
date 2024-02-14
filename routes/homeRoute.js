const express = require('express')
const router = express.Router()

//middlewares
const jwtAuth = require('../Controller/libs/jwtAuth')

//controllers
const {homePageController, loginController, signUpController, verifyEmailController} = require('../Controller/homeControllers')

//routes
router.get('/' , jwtAuth, homePageController)

router.post('/login', loginController)

router.post('/signup', signUpController)

router.get('/signup/verify/:email/:id', verifyEmailController)

module.exports = router