const User = require('../DB/model/user')
var jwt = require('jsonwebtoken');

const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByPk(username)
        if (!user) {
            return res.json({ message: "invalid account" });
        }
        else {
            // const match=await bcrypt.compare(password,user.password);
            const match = (password === user.password)
            if (!match) {
                return res.json({ message: "invalid account" });
            }
            else {
                const payload = {
                    username: user.username,
                    role: user.role
                }
                const token = jwt.sign(payload, process.env.SIGNINTOKEN, { expiresIn: '7d' });
                res.cookie('token', token, {
                    maxAge: 7 * 60 * 60 * 24 * 1000,  // = 7 days in milliseconds
                    httpOnly: true,
                    // secure: true // limits the scope of the cookie to "secure" channels.
                });
                return res.status(200).json({
                    success: true,
                    status: res.statusCode,
                    message: 'successfully logged in to account',
                    data: payload
                });
            }

        }
    }
    catch (err) {
        return res.json({
            success: false,
            status: res.statusCode,
            message: ("error login: ", err)
        });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({
            success: true,
            status: res.statusCode,
            message: "Successfully logout",
        });
    }
    catch (err) {
        return res.json({
            success: false,
            status: res.statusCode,
            message: ("error logout: ", err)
        });
    }
}

const updatePassword = async(req,res)=>{
    try{
        const {oldPassword , newPassword}= req.body;
        console.log(oldPassword , newPassword,req.user.username)
        const user = await User.findByPk(req.user.username);
        const match = (oldPassword==user.password)
        if(!match){
            return res.json({
                success: false,
                status: res.statusCode,
                message: "old password invalid",
            });
        }
        else{
            // const hash = await bcrypt.hash(newPassword,parseInt(process.env.NUMCrypt));
            const updatePass = await User.update({ password:newPassword },
				{
					where: { username:req.user.username }
				});
            if(!updatePass){
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "fail update password",
                });
            }
            else{
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "successfully updated password",
                });
            }
        }
    }
    catch(err){
        return res.json({
            success: false,
            status: res.statusCode,
            message: ("error  updating password: ", err)
        });
    }
}
module.exports = { signin, logout,updatePassword }