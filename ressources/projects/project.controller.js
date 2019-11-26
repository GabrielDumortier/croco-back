import { Project } from './project.model';
import { isAdmin, isModerator, isEditor, isSpectator } from '../../utils/projectCheckRole';
import { User } from '../users/user.model';

// GET /api/projects/
export const list = async (req, res) => {
    try {
        const projects = await Project.find({}, { __v: 0 });
        if (!projects) return res.status(404).end();
        res.status(200).json({ projects: projects });
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

// GET /api/projects/:id
export const listOne = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id }, { __v: 0 });
        if (!project) return res.status(404).end();
        res.status(200).json({ projects: project });
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
};

// POST /api/projects/
export const create = async (req, res) => {
    try {
        // add the creator to the user.assigned
        const author = await User.findOne({ _id: req.body.author_id }, { avatar_url: 1, _id: 1, email: 1, job: 1 })
        req.body.users = []
        req.body.users.push(
            {
                role: "administrator",
                user_id: author._id,
                avatar_url: author.avatar_url,
                email: author.email,
                job: author.job
            }
        )
        const project = await Project.create({ ...req.body });
        res.status(201).json({ projects: project });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

// PUT  /api/projects/
export const updateOne = async (req, res) => {
    try {
        const updatedProject = await Project.findOneAndUpdate({
            _id: req.params.id
        },
            req.body,
            { new: true, runValidators: true }
        )

        if (!updatedProject) return res.status(404).end();

        const tasks = await updatedProject.tasks.map(task => {
            return { id: task._id, users: task.assigned.map(ass => ass.user_id) }
        });
        // loop on each task of the project
        await tasks.map(async task => {
            //loop en each users assigned to a task a find each user
            await task.users.map(async user_id => {
                let user = await User.findById(user_id)
                // find the index of the correct users.projects[] 
                let p_index = await user.projects.findIndex(project => (project.project_id === req.params.id))
                // find if the task is already in the user.projects[].tasks[]
                if (p_index === -1) {
                    user.projects.push({ project_id: req.params.id, invitedBy: updatedProject.author_id, tasks: [task.id] })
                    // p_index = await user.projects.findIndex(project => (project.project_id === req.params.id))
                } else {
                    // push the new task
                    let t_index = user.projects[p_index].tasks.indexOf(task.id);
                    if (t_index === -1) user.projects[p_index].tasks.push(task.id);
                }

                // update the user
                await User.findOneAndUpdate({
                    _id: user_id
                },
                    user,
                    { new: true, runValidators: true }
                );
            })
        })
        res.status(200).json({ projects: updatedProject });
    } catch (e) {
        console.error(e);
        res.status(400).end()
    }
};

export const deleteOne = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete({
            _id: req.params.id
        }, { __v: 0 })
        if (!deletedProject) return res.status(404).end();
        deletedProject.users.map(async user => {
            // delete the project one the users
            let updatedUser = await User.findById(user.user_id);
            let index = updatedUser.projects.findIndex( project => {project.project_id === req.params.id})
            updatedUser.projects.splice(index,1)
            await User.findByIdAndUpdate(
                user.user_id
            ,
                updatedUser,
                {new:true, runValidators:true}
            )
        })
        res.status(200).json({ projects: deletedProject });
    } catch (e) {
        console.error(e);
        res.status(400).end()
    }
};