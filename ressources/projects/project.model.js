import mongoose from 'mongoose';
import {colorValidator, emailValidator} from '../../utils/validator';

const projectsSchema = new mongoose.Schema({
    name: {
        type : String,
        required :true,
        maxlength: 50 
    },
    description: {
        type : String,
        maxlength: 500,
        default: ""
    },
    author_id: {
        type: String,
        required: true,
    },
    creation_date : {
        type: Date,
        default: Date.now,
        immutable: true
    },
    start_date : {
        type: Date,
        default: Date.now,
    },
    finish_date : {
        type : Date,
        default: Date.now,
    },
    deadline : {
        type : Date,
        default: Date.now,
    },
    status : {
        type : String,
        default : "created",
        enum : ["created","started","finished","abandoned"]
    },
    users : [
        {
            user_id : {
                type : String,
                maxlength : 50
            },
            job : {
                type : String,
                maxlength : 50
            },
            role : {
                type : String,
                default : "administrator",
                enum : ["administrator", "moderator","editor","spectator"]
            },
            avatar_url : {
                type: String,
                default : "https://picsum.photos/id/237/60/60/"
            },
            email : {
                type : String,
                validator : [emailValidator, "VALIDATOR - ERROR - project.model : projects.users.email is invalid (email formatting required)"]
            }
        }
    ],
    is_private : {
        type : Boolean,
        default : true
    },
    attachments : [
        {
            path : {
                type : String
            },
            name : {
                type : String,
                maxlength : 50
            },
            description : {
                type : String,
                maxlength : 250
            }
        }
    ],
    comments : [
        {
            author_id : {
                type : String,
                required: true
            },
            avatar_url : {
                type: String,
                default : "https://picsum.photos/id/237/60/60/"
            },
            comment : {
                type : String,
                maxlength : 400,
                default: ""
            },
            date : {
                type : Date,
                default: Date.now,
                immutable: true
            }
        }
    ],
    git : {
        type : String,
        default: "https://github.com/"
    },
    ressources : [
        {
            name : {
                type : String,
                maxlength : 50
            },
            description : {
                type : String,
                maxlength : 250
            },
            url : {
                type : String
            },
            author : {
                type : String
            },
            date : {
                type : Date,
                default: Date.now,
                immutable: true
            }
        }
    ],
    color : {
        type : String,
        maxlength: 7,
        validator: [colorValidator, "VALIDATOR - ERROR - project.model : projects.color is invalid (#hexadecimal required)"],
        default : '#0892d0'
    },
    tasks : [
        {
            name : {
                type : String,
                maxlength : 50
            },
            description : {
                type : String,
                maxlength : 250
            },
            author_id : {
                type : String,
                required: true
            },
            labels : [
                {
                    name : {
                        type : String,
                        maxlength : 20
                    },
                    color : {
                        type : String,
                        maxlength: 7,
                        validate: [colorValidator, "VALIDATOR - ERROR - project.model : projects.tasks.label.color is invalid (#hexadecimal required)"]
                    }
                }
            ],
            assigned : [
                {
                    user_id : {
                        type : String,
                        required : true
                    },
                    spend : {
                        type : Number,
                        default : 0
                    },
                    avatar_url : {
                        type: String,
                        default : "https://picsum.photos/id/237/60/60/"
                    }
                }
            ],
            total_time: {
                type:Number,
                default: 0
            },
            checklist : [
                {
                    name : {
                        type : String,
                        maxlength : 50,
                        default: ""
                    },
                    done : {
                        type : Boolean,
                        default : false
                    }
                }
            ],
            deadline : {
                type : Date,
                default: Date.now
            },
            progression : {
                type : Number,
                default : 0
            },
            estimated : {
                type : Number,
                default : 1
            },
            priority : {
                type : String,
                enum : ["high","middle","low","none"],
                default : "none"
            },
            attachments : [
                {
                    name : {
                        type : String,
                        maxlength : 20,
                        default: ""
                    },
                    description : {
                        type : String,
                        maxlength : 200
                    },
                    path : {
                        type : String
                    },
                    author_id : {
                        type : String,
                        required: true
                    },
                    date : {
                        type : Date,
                        default: Date.now,
                        immutable: true
                    }
                }
            ],
            comments : [
                {
                    author_id : {
                        type : String,
                        required: true
                    },
                    avatar_url : {
                        type: String,
                        default : "https://picsum.photos/id/237/60/60/"
                    },
                    comment : {
                        type : String,
                        maxlength : 250,
                        default: ""
                    },
                    date : {
                        type : Date,
                        default: Date.now,
                        immutable: true
                    }
                }
            ],
            status : {
                type : String,
                maxlength : 12,
                default: "todo",
                enum : ["todo","doing","done","paused"]
            },

        }
    ]
})


export const Project = mongoose.model('project',projectsSchema)