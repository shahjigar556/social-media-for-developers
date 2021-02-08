const express=require('express')
const mongoose=require('mongoose');
const config =require('config');

const app=express();

// Init middleware
app.use(express.json({extended:false}));

// connecting to MongoDb database
mongoose.connect(config.get('mongoURI'),{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>console.log("connected to Database....."))
.catch(ex=>console.log(ex.message))


//Defining the Routes

app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))


// defining the port
const PORT=process.env.PORT||3000

app.listen(PORT,()=>console.log(`Server started on Port ${PORT}`));