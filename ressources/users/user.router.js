import {Router} from 'express';
import {list, listOne, listOneByEmail} from './user.controller';
import {verifyToken, verifyUser, verifyLogin} from '../../utils/tokens';

const userRouter = Router();

// /api/user/
userRouter
    .route('/')
    .get(list)

// /api/user/:id
userRouter
    .route('/:id')
    .get(listOne)
// /api/user/email/:email
userRouter
    .route('/email/:email')
    .get(listOneByEmail)

 export default userRouter;