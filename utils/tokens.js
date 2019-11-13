import jwt from 'jsonwebtoken';
import {User} from '../ressources/users/user.model'

// Here to change encryption key of the token
const secretKey = 'aKroKeydile';
// Here to change the duration of the token
const expiration = '3600s'

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

const verify = (req, res, next) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(403).end();
    } else {
      next();
    }
  });
};

export const sign = async (req, res) => {
  const user_id = await User.findOne({email:req.body.email},{ _id: 1})
  jwt.sign({
    email: req.body.email
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

export { verifyToken, verify, sign }