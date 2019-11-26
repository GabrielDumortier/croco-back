import express from 'express';
import {connect} from './utils/db';
import {json, urlencoded} from 'body-parser';
import usersRouter from './ressources/users/user.router';
import userSecureRouter from './ressources/users/userSecure.router';
import projectsRouter from './ressources/projects/project.router';
import cors from 'cors'
import {corsOptionsDelegate} from './utils/corsOptions'
//one file to change most of the common value
import value from './utils/globalValue'

// Here to change the listenning port
const port = value.port

const app = express();

app.use(json());
app.use(urlencoded({extended:true}));

//CORS - edit the whitelist for production
app.use(cors(corsOptionsDelegate)) // utils/corsOptions

//routes
app.use('/api/users', usersRouter); // ressources/users
app.use('/api/user', userSecureRouter); // ressources/users
app.use('/api/projects', projectsRouter); // ressources/projects

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