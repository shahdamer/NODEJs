var jwt = require('jsonwebtoken');
const { userModel } = require('../DB/model/user.model');
const auth=()=>{
    return async (req,res,next)=>{

        let {token}=req.headers;
        if(!token.startsWith(process.env.AUTHTOKEN)){
            res.json({message:"invalid bearer token"});
        }
        else{
            token = token.split(process.env.AUTHTOKEN)[1];
            const decoded=await jwt.verify(token,process.env.SIGNINTOKEN)//الملعومات الي جوا التوكين
            const user = await userModel.findById(decoded.id)
            req.user=user;
            next()
        }
    }
}
module.exports={auth}