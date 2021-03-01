const mongoose=require('mongoose')
const Joi=require('joi');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

function validateUser(user)
{
    const schema=Joi.object({
        name:Joi.string().min(5).max(30).required(),
        email:Joi.string().email().required(),
        password:Joi.string().required().min(5)
    })
    return schema.validate(user);
}
const Users=mongoose.model('user',userSchema);

module.exports.Users=Users;
module.exports.validateUser=validateUser;