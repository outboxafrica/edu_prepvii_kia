//import User model
const User = require('../model/usermodel')

//import modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../config/myDbUrl')

//create a user
exports.signup = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location 
    })
    try {
        await bcrypt.genSalt(8, (err, salt)=>{
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error)  {
                    console.log(eror)
                } else {
                    user.password = hash;
                    user.save((error) => {
                        if (error) {
                            return res.status(401).json({
                                message:"invalid input"
                            }); 
                        } else {
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


// Login
exports.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
            return res.status(400).json({ emailError: "You are not registered! Please register!" })
        }

        // unhashing password and check bcrypt
        bcrypt.compare(password, user.password)
            .then(isCorrect => {
                if (isCorrect) {
                // return res.status(400).json({login: "login success"})
                // use payload and create token for user
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                jwt.sign(
                    payload,
                    key.secretOrKey,
                    { expiresIn: '1h' },
                    (err, token) => {
                        if (err) {
                            throw err
                            res.json({
                                success: false,
                                token: "null"
                            })
                        }
                        res.json({
                            success: true,
                            token: "Bearer " + token 
                        })
                    }
                )
            } else {
                return res.status(400).json({ login: "Invalid password" })
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
}







