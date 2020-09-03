const User=require('../model/usermodel')
const bcrypt=require('bcryptjs');

//create a user
exports.signup=async(req, res)=>{
    const user=new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location 
    })
    try {
        await bcrypt.genSalt(8, (err, salt)=>{
            bcrypt.hash(user.password, salt, (error, hash)=>{
                if(error){
                    console.log(eror)
                }else{
                    user.password=hash;
                    user.save((error)=>{
                        if(error){
                            console.log(eror)  
                        }else{
                            res.json(req.body)
                        }
                    })
                }
            })
        })
        
    } catch (error) {
        
    }
}




