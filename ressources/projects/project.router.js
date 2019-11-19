import {Router} from 'express';
import {list,listOne, create, updateOne, deleteOne} from './project.controller';
import {verifyToken, verifyLogin, verifyUser} from '../../utils/tokens'

const projectRouter = Router();

// /api/projects/
projectRouter
    .route('/')
    .get(list)
    .post(create);
    
// /api/projects/:id
projectRouter
    .route('/:id')
    .get(listOne)
    .put(updateOne)
    .delete(deleteOne);

 export default projectRouter;