const express=require('express')
const mongoose=require('mongoose');
const config =require('config');

const app=express();
const PORT=process.env.PORT||3000

// connecting to MongoDb database
mongoose.connect(config.get('mongoURI'),{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("connected to Database....."))
.catch(ex=>console.log(ex.message))


app.listen(PORT,()=>console.log(`Server started on Port ${PORT}`));