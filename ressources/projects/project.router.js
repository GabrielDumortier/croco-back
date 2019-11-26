import {Router} from 'express';
import {list,listOne, create, updateOne, deleteOne} from './project.controller';
import {verifyToken, verifyLogin, verifyUser} from '../../utils/tokens'

const projectRouter = Router();

// /api/projects/
projectRouter
    .route('/')
    .get(list)
    .post(verifyToken, verifyLogin,create);
    
// /api/projects/:id
projectRouter
    .route('/:id')
    .get(listOne)
    .put(verifyToken, verifyLogin,updateOne)
    .delete(verifyToken, verifyLogin,deleteOne);

 export default projectRouter;