import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import {emailValidator} from '../../utils/validator'

const usersSchema = new mongoose.Schema({
    
    firstname: {
        type: String, 
        maxlength: 50,
        default: "" 
        // required: true
    },
    lastname: {
        type: String, 
        maxlength: 50,
        default: "" 
        // required: true
    },
    username: {
        type: String, 
        maxlength: 50,
        default: "" 
        // required: true
    },
    email: {
        type: String, 
        maxlength: 50, 
        required: true,
        validate: [emailValidator, "VALIDATOR - ERROR - user.model : users.email is invalid"]
    },
    password: {
        type: String,
        minlength: 6, 
        // maxlength: 50, 
        required: true
    },
    avatar_url: {
        type: String,
        default: 'https://picsum.photos/id/237/60/60/'
    },
    company: {
        type: String, 
        maxlength: 50,
        default: ""
    },
    job: {
        type: String, 
        maxlength: 50,
        default: ""
    },
    links: {
        github :{type: String, default:""},
        linkedin :{type: String, default:""},
        blog :{type: String, default:""},
        website :{type: String, default:""}
    },
    phone: {
        type: String,
        maxlength: 20,
        default: ""
    },
    projects: [{
        project_id: {type: String},
        favorite: {type: Boolean},
        accepted: {type: Boolean, default : false},
        invitedBy: {type: String},
        tasks : [{type: String}]
    }], // pas sur de la syntaxe
    tasks: [
        {type: String} // il faudra effacer
    ],
    description :{
        type: String,
        maxlength:500,
        default: ""
    }
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