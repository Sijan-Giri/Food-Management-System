const toRestrict = (...roles) => {
    return (req,res,next) => {
        const userRole = req.user.userRole;
        console.log(userRole)
        console.log(roles)
        if(!roles.includes(userRole)) {
            res.status(400).json({
                message : "You don't have permission"
            })
        }
        else {
            next();
        }
    }
}

module.exports = toRestrict;