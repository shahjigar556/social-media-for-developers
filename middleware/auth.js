const jwt=require('jsonwebtoken')
const config=require('config')

module.exports=function(req,res,next){
    try{
      const token=req.header('x-auth-token')
      if(!token){
          return res.status(401).json({"msg":"Access Denied"})
      }
      const decoded=jwt.verify(token,config.get('jwtKey'))  // decoding the payload
      req.user=decoded
      next();
    }catch(ex){
        return res.status(401).json({"msg":"Authentication failed(wrong token)"})
    }
}