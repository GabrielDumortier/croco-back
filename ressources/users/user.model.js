import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import {emailValidator} from '../../utils/validator'

const usersSchema = new mongoose.Schema({
    
    firstname: {
        type: String, 
        maxLength: 50, 
        // required: true
    },
    lastname: {
        type: String, 
        maxLength: 50, 
        // required: true
    },
    username: {
        type: String, 
        maxLength: 50, 
        // required: true
    },
    email: {
        type: String, 
        maxLength: 50, 
        required: true,
        validator: [emailValidator, "VALIDATOR - ERROR - user.model : users.email is invalid"]
    },
    password: {
        type: String, 
        // maxLength: 50, 
        required: true
    },
    avatar_url: {
        type: String,
        default: 'https://picsum.photos/id/237/60/60/'
    },
    company: {
        type: String, 
        maxLength: 50
    },
    job: {
        type: String, 
        maxLength: 50
    },
    links: [
        {type: String}
    ],
    phone: {
        type: Number,
        maxLength: 20
    },
    projects: [{
        project_id: {type: String},
        favorite: {type: Boolean},
        accepted: {type: Boolean, default : false},
        invitedBy: {type: String},
    }], // pas sur de la syntaxe
    tasks: [
        {type: String}
    ]
});

// METHOD TO ENCRYPT PASSWORD
usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// METHOD TO VERIFY A PASSWORD
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


export const User = mongoose.model('users', usersSchema);