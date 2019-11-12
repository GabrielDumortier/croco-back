import {Router} from 'express';
import {list,listOne, create, updateOne, deleteOne} from './project.controller';
import {verifyToken, verify} from '../../utils/tokens'

const projectRouter = Router();

projectRouter
    .route('/')
    .get(verifyToken, verify, list)
    .post(create)

projectRouter
    .route('/:id')
    .get(listOne)
    .put(updateOne)
    .delete(deleteOne)

 export default projectRouter;