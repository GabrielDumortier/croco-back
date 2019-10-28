import {User} from './user.model';
import {createUser, authUser} from '../../utils/createAuthUser';
import { sign } from '../../utils/tokens';

// We can GET and PUT password from here

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
        res.status(200).json({error : 403});
        // TODO: check why need to put 200 instead of 403 which doesn't work
    }
};

// POST /api/user/
export const create = async (req, res) => {
    createUser(req,res)
};

// PUT  /api/user/:id
export const updateOne = async (req,res) =>{
    try {
        const user = await User.findOne({_id:req.params.id},{ __v:0})
        if(!user) return res.status(404).end();
        if (user.password !== req.body.password) req.body.password = user.generateHash(req.body.password)
        const updatedUser = await User.findOneAndUpdate({
            _id:req.params.id
        },
            req.body,
            {new:true}
        )
        if(!updatedUser) return res.status(404).end();     
        res.status(200).json({users:updatedUser});
    } catch {
        console.error(e);
        res.status(400).end()
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