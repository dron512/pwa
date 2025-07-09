const mongoose = require('mongoose');

const mongo_url = "mongodb+srv://parkmyounghoi:3gJZt7ZkjQAGduNv@cluster0.n7xpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// console.log("mongo_url: ", mongo_url);

const connect = ()=>{
  mongoose.connect(mongo_url,{ dbName:'rncs' })
    .then(()=>{
      console.log("Mongo DB Connected!")
    })
    .catch((err)=>{
      console.error('Mongo DB Error',err);
    });
}

module.exports = connect;