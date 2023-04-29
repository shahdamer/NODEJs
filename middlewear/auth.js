var jwt = require('jsonwebtoken');
const verifyToken = async (req,res,next)=>{
        try {
        let {token}=req.headers;
        console.log (token);
           const decoded=await jwt.verify(token,process.env.SIGNINTOKEN)//الملعومات الي جوا التوكين
           const {username, role} = decoded;
           req.user = {
            username,
            role
        }
        console.log (username, role);
            next()
    
} catch (error) {
    return res.status(401).json({
        success: false,
        message: 'Invalid access token',
        status: 401,
    });
}
}

module.exports={verifyToken}



