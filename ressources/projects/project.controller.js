import {Project} from './project.model';
import {isAdmin, isModerator, isEditor, isSpectator} from '../../utils/projectCheckRole';
import { User } from '../users/user.model';

// GET /api/projects/
export const list = async (req, res) => {
    try{
        const projects = await Project.find({},{__v:0});
        if(!projects) return res.status(404).end();
        res.status(200).json({projects:projects});
    } catch(e){
        console.error(e)
        res.status(400).end()
    }
}

// GET /api/projects/:id
export const listOne = async (req,res)=>{
    try{
        const project = await Project.findOne({_id:req.params.id},{__v:0});
        if(!project) return res.status(404).end();
        res.status(200).json({projects:project});
    } catch(e){
        console.error(e)
        res.status(400).end()
    }
};

// POST /api/projects/
export const create = async (req, res) => {
    try{
        console.log(req.body)
        const author = await User.findOne({_id: req.body.author_id},{avatar_url : 1, _id:1,email:1,job:1})
        req.body.users = []
        req.body.users.push(
            {
                role: "administrator", 
                user_id : author._id,
                avatar_url : author.avatar_url, 
                email : author.email, 
                job : author.job}
            )
        const project = await Project.create({...req.body});
        res.status(201).json({projects:project});
    }catch(e) {
        console.log(e);
        res.status(400).end();
    }
}

// PUT  /api/projects/
export const updateOne = async (req,res) =>{
    try {
        const updatedProject = await Project.findOneAndUpdate({
                _id:req.params.id
            },
                req.body,
                {new:true, runValidators:true}
        )
        if(!updatedProject) return res.status(404).end();
        res.status(200).json({projects:updatedProject});
    } catch(e){
        console.error(e);
        res.status(400).end()
    }
};

export const deleteOne = async (req,res) =>{
    try {
        const deletedProject = await Project.findByIdAndDelete({
                _id:req.params.id
            },{__v:0})
        if(!deletedProject) return res.status(404).end();
        res.status(200).json({projects:deletedProject});
    } catch(e){
        console.error(e);
        res.status(400).end()
    }
};