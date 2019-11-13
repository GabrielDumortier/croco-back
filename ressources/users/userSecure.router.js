import {Router} from 'express';
import {listOne, create, login, updateOne, deleteOne, newPassword } from './userSecure.controller';


const userRouter = Router();

userRouter
    .route('/')
    .post(create);

userRouter
    .route('/:id')
    .get(listOne)
    .put(updateOne)
    .delete(deleteOne)

userRouter
    .route('/login')
    .post(login);

userRouter
    .route('/forgottenpassword')
    .post(newPassword);

 export default userRouter;