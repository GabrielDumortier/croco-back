import {User} from './user.model';
import {createUser, authUser} from '../../utils/createAuthUser';
import { sign } from '../../utils/tokens';
import generatePassword from '../../utils/generatePassword';
import {mailer} from '../../utils/mailer';

// We can GET, PUT & POST password from here

// GET /api/user/:id
export const listOne = async (req,res)=>{
    try{
        const user = await User.findOne({_id:req.params.id},{ __v:0});
        if(!user) return res.status(404).end();
        res.status(200).json({users:user});
    } catch(e){
        console.error(e)
        res.status(400).end()
    }
};
// POST /api/user/login/
export const login = async (req,res)=>{
    if(await authUser(req,res)) {
        sign(req,res);
    } else {
        res.status(403).end();
    }
};

// POST /api/user/
export const create = async (req, res) => {
    createUser(req,res)
};

// PUT  /api/user/:id
export const updateOne = async (req,res) =>{
    if (req.body._id && req.params.id !== req.body._id ) {
        console.error('req.body._id and req.params.id didn\'t matches')
        res.status(400).end()
    } else {
        try {
            const user = await User.findOne({_id:req.params.id},{ __v:0})
            if(!user) return res.status(404).end();
            if (req.body.password === "" || !(req.body.password)) req.body.password = user.password
            if (user.password !== req.body.password) req.body.password = user.generateHash(req.body.password);
            const updatedUser = await User.findOneAndUpdate({
                _id:req.params.id
            },
                req.body,
                {new:true, runValidators:true}
            )
            if(!updatedUser) return res.status(404).end();     
            res.status(200).json({users:updatedUser});
        } catch(e) {
            console.error(e);
            res.status(400).end()
        }
    }
};

// DELETE /api/user/:id
export const deleteOne = async (req,res) =>{
    try {
        const deletedUser = await User.findByIdAndDelete({
                _id:req.params.id
            },{ __v:0})
        if(!deletedUser) return res.status(404).end();
        res.status(200).json({users:deletedUser});
    } catch(e){
        console.error(e);
        res.status(400).end()
    }
};

export const newPassword = async (req, res) => {
    let password = generatePassword();
    let email = req.body.email
    let text = `
Greetings from the team Akroko !
here is your new password : ${password}
You can change it in your profile`;
    try {
        const user = await User.findOne({email:email},{ __v:0})
        if(!user) res.status(400).end();
        user.password = user.generateHash(password)
        const updatedUser = await User.findOneAndUpdate({
            email:email
        },
            user,
            {new:true}
        )
        if(!updatedUser) res.status(400).end();
        mailer(email,'Akroko : new password',text)     
        res.status(200).json({users:updatedUser})
    } catch(e){
        console.error(e);
        res.status(400).end()    
    }
}