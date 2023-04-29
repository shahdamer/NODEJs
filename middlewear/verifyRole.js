
const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        console.log(allowedRoles)
        console.log(req.user.role)
        if (!req?.user.role)
            return res.sendStatus(401);
        if (!allowedRoles.includes(req.user.role))
            return res.sendStatus(401);
        next();
    }
}

module.exports={verifyRoles} 
