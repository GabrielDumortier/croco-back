import {User} from './user.model';
import {emailValidator} from '../../utils/validator';

// GET /api/users/
export const list = async (req,res)=>{
    try{
        const users = await User.find({},{password : 0, __v:0});
        if(!users) return res.status(400).end();
        res.status(200).json({users:users});
    } catch(e){
        console.error(e)
        res.status(400).end()
    }
};

// GET /api/users/:id
export const listOne = async (req,res)=>{

    try{
        const user = await User.findOne({_id:req.params.id},{password : 0, __v:0});
        if(!user) return res.status(404).end();
        res.status(200).json({users:user});
    } catch(e){
        console.error(e)
        res.status(400).end()
    }
};

// GET /api/users/email/:email
export const listOneByEmail = async (req,res)=>{
    if (!(emailValidator(req.params.email))) res.status(400).end()
    try{
        const user = await User.findOne({email:req.params.email},{password : 0, __v:0});
        if(!user) return res.status(404).end();
        res.status(200).json({users:user});
    } catch(e){
        console.error(e)
        res.status(400).end()
    }
}; 