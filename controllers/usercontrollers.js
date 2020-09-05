//import User model
const User=require('../model/usermodel')

//import bcryptjs
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
                            return res.status(401).json({
                                message:"invalid input"
                            }); 
                        }else{
                            res.json(req.body)
                        }
                    })
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
        username:req.body.username
    })
    .then(user=>{
        if(!user){
            return res.status(401).json({
                message:"Invalid username"
            });
        }else
        bcrypt.compare(req.body.password, user.password, (error, isuserresult)=>{
            if(error){             
                return res.status(401).json({
                    message:"Passwords dont match"
                });   
            }                       
      //if passwords match
      if(isuserresult){
          
        return res.status(200).json({
            message:"Welcome to EDU Q&A"
        });
      
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





