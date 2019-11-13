// IMPORT MODEL
import {User} from '../ressources/users/user.model';
import { mailer } from '../utils/mailer';

const createUser = async (req,res) =>{
  let user;
  try {
    user = await User.findOne({ 'email': req.body.email },{ __v:0});
  } catch(e){
    console.error(e)
    res.end()
  }
  if (user) {
    console.error('This email is already taken')
    res.end()
  } else {
    // USER CREATION
    let newUser = new User();
    let username = req.body.email.split('@')[0];

    newUser.email = req.body.email;
    newUser.password = newUser.generateHash(req.body.password);
    newUser.username = username;
    try{
      await User(newUser).save();
      // await User.create(newUser);
      
      let text = `Dear ${username}, you are welcome to the Akroko family ! We wish you'll have a great times using our website !`
      mailer(req.body.email, 'Welcome to the Akroko Family !', text)
      res.status(201).json(newUser);
    }catch(e){
      console.error(e);
      res.status(400).end();
    }
  }

} 

const authUser = async (req,res) => {
  let user;
  try {
    user = await User.findOne({ 'email': req.body.email },{ __v:0});
  } catch(e){
    console.error(e)
    return false;
  }
  if (user) {
    if (!user.validPassword(req.body.password)) {
      console.error('Wrong password');
      return false;
    } else if (user.validPassword(req.body.password)) {
      return true;
    } else {
      console.error('An error occured');
      return false;
    }
  } else {
    console.error('This user does not exist');
    return false;
  }
}

export  {createUser, authUser};