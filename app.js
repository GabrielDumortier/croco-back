import express from 'express';
import {connect} from './utils/db';
import {json, urlencoded} from 'body-parser';
import usersRouter from './ressources/users/user.router';
import userSecureRouter from './ressources/users/userSecure.router';
import projectsRouter from './ressources/projects/project.router';
import cors from 'cors'

// Here to change the listenning port
const port = 8001

const app = express();

app.use(json());
app.use(urlencoded({extended:true}));

//CORS - to remove for production
app.use(cors())
//routes
app.use('/api/users', usersRouter);
app.use('/api/user', userSecureRouter);
app.use('/api/projects', projectsRouter);

const start = async () => {
    try {
        await connect();
        app.listen(port, () => {
            console.log('Rest api is listening on port '+ port);
        });
    } catch(err) {
        throw err;
    }
}

start();