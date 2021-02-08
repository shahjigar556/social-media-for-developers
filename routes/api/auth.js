const app=require('express')
const router=app.Router();
const {Users,validateUser} =require('../../models/Users')
const bcrypt=require('bcrypt')
const config=require('config')
const jwt=require('jsonwebtoken');
// @GET api/auth
// @desc
// @Public

router.post('/',async (req,res)=>{
    const {error}=validateUser(req.body)
    if(error){
        const message=error.details[0].message;
        return res.status(400).json({error:message})
    }

    const {email,password}=req.body;
    console.log(password)
    // check if email exists
    
    try{
        let user=await Users.findOne({email})
        if (!user){
            return res.status(401).json({"msg":"Invalid credentials"})
        }

    // user found check for password
    console.log(user.email)
    console.log(user.password)
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return res.status(401).json({"msg":"Invalid credentials"})
    }

    // Provide the user with jwt
    const payload={
        id:user._id
    }
    const token=jwt.sign(payload,config.get('jwtKey'))
    return res.json({token})

    }catch(ex){
        console.log(ex.message)
        res.status(500).send("server error")
    }
    
})
module.exports=router;
