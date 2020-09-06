//IMPORT MODULES
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken')
// const passport = require('passport')

//IMPORT MODEL
const User=require('../model/usermodel')


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
                    return res.status(500).json({
                        error: "password required!"
                    })
                }else{
                    user.password=hash;
                    user.save((error)=>{
                      if(error){//data conflict
                        res.status(409).json({
                            error:"Invalid email"
                        })
                      }else{
                           res.status(201).json(req.body)
                      }
                    }
                           
                    )
                }
            })
        })
        
    } catch (error) {
        console.log(error)
    }
}



//login a user
exports.login=(req, res, next)=>{
    //mock user
    const user=User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(!user){
            return res.status(401).json({
                message:"Invalid email"
            });
        }else
        bcrypt.compare(req.body.password, user.password, (error, isuserresult)=>{
            if(error){             
                return res.status(401).json({
                    message:"Passwords dont match"
                });   
            }     

      if(isuserresult){
          const token=jwt.sign({
              email:user.email,
              userId: user._id
            },
            process.env.JWT_KEY,
            {
                expiresIn:"30min"
            } 
            );
        res.status(201).json({
            message:"Welcome to EDU Q&A",
            token:token
        })
    
      }else{
        return res.status(401).json({
            message:"Authentication failed"
        });  
      }
        })
    })

    .catch((error)=>{
          console.log(error)
    })

}





