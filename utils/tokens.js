import jwt from 'jsonwebtoken';
import {User} from '../ressources/users/user.model'

// Here to change encryption key of the token
const secretKey = 'aKroKeydile';
// Here to change the duration of the token
const expiration = '3600s'


//check if the token is valid
const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(403).end();
  }
};

//check if the user is logged in
const verifyLogin = (req, res, next) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(403).end();
    } else {
      next();
    }
  });
};

// check if the user logged in the same as the asked params
const verifyUser = (req, res, next) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(403).end();
    } else if (authData._id === req.params.id || authData._id === req.body._id) {
      next();
    } else {
      res.status(403).end()
    }
  });
};

//create the token for the authentification (login)
export const sign = async (req, res) => {
  const user_id = await User.findOne({email:req.body.email},{ _id: 1})
  jwt.sign({
    email: req.body.email,
    _id : user_id._id
  },
    secretKey, { expiresIn: expiration },
    (err, token) => {
      if (err) console.error(err)

      res.status(200).json({ 
        idToken : token,
        expiresIn : expiration,
        currentUser : user_id._id
       });
    });
}

export { verifyToken, verifyUser, verifyLogin, sign }