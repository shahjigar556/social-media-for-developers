const app=require('express')
const router=app.Router();
const {Users,validateUser} =require('../../models/Users')
const bcrypt=require('bcrypt')
const config=require('config')
const jwt=require('jsonwebtoken');
const auth=require('../../middleware/auth');

// @GET api/auth
// @desc  authenticating user
// @Public
router.get('/',auth,async (req,res)=>{
    try {
        const user=await Users.findById(req.user.id).select('-password');
        if(!user)
            res.status(400).json({msg:"User is Not Authenticated"});
        res.json(user);
    } catch (err) {
        console.error(err);
    }
})

// @POST api/auth
// @desc  authenticating user
// @Public

router.post('/',async (req,res)=>{
    console.log(req.body);
    // const {error}=validateUser(req.body)
    // if(error){
    //     const message=error.details[0].message;
    //     return res.status(400).json({error:message})
    // }

    const {email,password}=req.body;
    
    // check if email exists
    
    try{
        let user=await Users.findOne({email})
        if (!user){ 
            console.log("here");
            return res.status(401).json({"msg":"Invalid credentials"})
        }

    // user found check for password
   
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        console.log("here......");
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
        return res.status(500).send("server error")
    }
    
})
module.exports=router;
