const mongoose = require('mongoose');

const Mongo_URL = process.env.Mongo_URL
//const Mongo_object = {useNewUrlParser: true, useUnifiedTopology: true}

const dbConnect = function(app, PORT){
    mongoose.connect(Mongo_URL)
    .then(()=>{
        console.log("Connected to mongodb");
        //Spins up server
        app.listen(PORT, ()=>{
            console.log("server is running on http://localhost:",PORT)
        })
    })
    .catch(err=>{
        console.log("couldn't connect to mongo: ",err)
    });
}

module.exports = {dbConnect};