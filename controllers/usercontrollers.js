// Import express-validator
const { validationResult } = require('express-validator');

// Import User model

// Import modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/usermodel');

// Import JWT secret key
const key = process.env.JWT_SECRET;

// Create a user
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  //   console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
  });
  try {
    await bcrypt.genSalt(8, (err, salt) => {
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
        //   console.log(error);
          return res.status(401).json({ message: 'Failed to hash password' });
        }

        user.password = hash;
        user.save((_error) => {
          if (_error) {
            // console.log(`ERROR >> ${_error}`);
            return res.status(401).json({
              message: 'Failed to save!',
            });
          }

          return res.json(req.body);
        });

        return null;
      });
    });
  } catch (error) {
    // console.log(error);

    return res.status(401).json({ message: 'Signup failed!' });
  }

  return null;
};

// Login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  //   console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const { email } = req.body;
  const { password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ emailError: 'You are not registered! Please register!' });
      }

      const name = user.username

      // unhashing password and check bcrypt
      bcrypt.compare(password, user.password)
        .then((isCorrect) => {
          if (isCorrect) {
            // return res.status(400).json({login: "login success"})
            // use payload and create token for user
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
            };
            jwt.sign(
              payload,
              key,
              { expiresIn: '1h' },
              (err, token) => {
                if (err) {
                //   console.log(`ERROR >> ${err}`);

                  return res.status(400).json({error: err});
                }
                return res.status(200).json({
                  username: name,
                  userToken: token,
                });
              },
            );
          } else {
            return res.status(400).json({ login: 'Invalid password' });
          }

          return null;
        })
        .catch((err) =>
        //   console.log(`ERROR >> ${err}`);
          res.status(401).json({ message: 'Incorrect password!' }));

      return null;
    })
    .catch((err) =>
    //   console.log(`ERROR >> ${err}`);

      res.status(401).json({ message: 'Failed!' }));

  return null;
};
