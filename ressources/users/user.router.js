import {Router} from 'express';
import {list, listOne, listOneByEmail} from './user.controller';

const userRouter = Router();

userRouter
    .route('/')
    .get(list)

userRouter
    .route('/:id')
    .get(listOne)

userRouter
    .route('/email/:email')
    .get(listOneByEmail)

 export default userRouter;