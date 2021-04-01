const app=require('express')
const router=app.Router();
const {Users,validateUser} =require('../../models/Users')
const bcrypt=require('bcrypt')
const config=require('config')
const jwt=require('jsonwebtoken');
const auth=require('../../middleware/auth');
const nodemailer=require('nodemailer')

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

//@POST api/auth/password
//@desc Route to recover Password
//PUBLIC

router.post('/password',async (req,res)=>{
   try {
       const {email}=req.body;
       const user=await Users.findOne({email})
       if(!user){
           return res.json({"msg":'User Not Registered'});
       }
       const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:`${config.get('username')}`,
            pass:`${config.get('password')}`
        }
    })

     const mailOptions={
        from:`${config.get('username')}`,
        to:`${email}`,
        subject:'Reset Password Link',
        text:'You are receiving this mail because You or someome else have requested Reset Password for Your account\n\n'
             +'Please Click on the Link or Paste it in the browser To complete the Process within one hour of receiving it\n\n'
             +`http://localhost:3000/reset/${user._id}\n\n`
             +'If You did not request this,please ignore this mail'
    }
    console.log('sending mail....');
    let info=await transporter.sendMail(mailOptions);
    console.log('mail sent');
    res.json({"msg":'mail sent'})
   } catch (err) {
       console.log(err)
       res.send('Internal server error')
   }
})

//POST api/auth/reset/:id
//@desc Reset Password
//PUBLIC

router.post('/reset/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        let user=await Users.findOneAndUpdate({_id:id},{password:req.body.password},{new:true})
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    
        user = await user.save();
        const payload = {
          id: user._id,
        };
        const token = jwt.sign(payload, config.get("jwtKey"));
    
        res.json({ token });
        
    } catch (err) {
        return res.send('server error')
    }
})
module.exports=router;
