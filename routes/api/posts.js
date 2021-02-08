const app=require('express')
const router=app.Router();

// @GET api/posts
// @desc
// @Private

router.get('/',(req,res)=>{
    res.send("Posts Route")
})
module.exports=router;
