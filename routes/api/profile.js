const app=require('express')
const router=app.Router();
const auth=require('../../middleware/auth')
// @GET api/profile
// @desc
//@Private

router.get('/',auth,async (req,res)=>{

    res.send("Profile Route")
    console.log(req.user)
})
module.exports=router;
