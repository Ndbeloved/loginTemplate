require('dotenv').config();
const express = require('express');
const {dbConnect} = require('./app');
const path = require('path')
const cookieParser = require('cookie-parser')
//const helmet = require('helmet')


const homeRoute = require('./routes/homeRoute')


const app = express();
//app.use(helmet)
app.use(cookieParser())
app.use(express.json());
app.use(express.static('public'))

//routes
app.use('/', homeRoute)


const PORT = process.env.PORT || 5000
dbConnect(app, PORT);

app.use((req, res)=>{
    res.json({"status": 404, "message": "couldn't find page"})
})
