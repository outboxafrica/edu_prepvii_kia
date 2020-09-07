//IMPORT MODULES
const jwt = require('jsonwebtoken')

module.exports=(req, res, next)=>{
    try {
        const token=req.headers.authorization;
        const decoded=jwt.verify(req.body.token, process.env.JWT_KEY);
       next()
        req.userData=decoded
    } catch (error) {
        return res.status(401).json({
            error:"Authentication failed"
        }); 
    }
   
}