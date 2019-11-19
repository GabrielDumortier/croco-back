import {Router} from 'express';
import {listOne, create, login, updateOne, deleteOne, newPassword } from './userSecure.controller';
import {verifyToken, verifyLogin, verifyUser} from '../../utils/tokens';

const userRouter = Router();

// /api/user/
userRouter
    .route('/')
    .post(create);

// /api/user/:id
userRouter
    .route('/:id')
    .get(listOne)
    .put(updateOne)
    .delete(deleteOne);

// /api/user/login
userRouter
    .route('/login')
    .post(login);

// /api/user/forgottenpassword
userRouter
    .route('/forgottenpassword')
    .post(newPassword);

 export default userRouter;