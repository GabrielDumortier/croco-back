const checkRole = (user_id, project) => {
    let index = -1
    index = project.users.filter((user, i => {
        if (user.user_id === user_id) return i
    }))
    if (user_id === project.author_id && index != -1) return "administrator";
    if (project.users[index].role && index != -1) return project.users[index].role
    else return 'none'
}

const isAdmin = (user_id, project) => {
    return (checkRole(user_id,project) === "administrator")? true : false;
}

const isModerator = (user_id, project, strict) => {
    if (strict === 'strict' || strict === true) return (checkRole(user_id,project) ===  "moderator") ? true : false;
    return (isAdmin(user_id,project) ||checkRole(user_id,project) ===  "moderator") ? true : false;
}

const isEditor = (user_id, project) => {
    if (strict === 'strict' || strict === true) return (checkRole(user_id,project) ===  "editor") ? true : false;
    return (isAdmin(user_id,project) || isModerator(user_id,project) || checkRole(user_id,project) ===  "editor") ? true : false;
}

const isSpectator = (user_id, project) => {
    if (strict === 'strict' || strict === true) return (checkRole(user_id,project) ===  "spectator") ? true : false;
    return (isAdmin(user_id,project) || isModerator(user_id,project) || isEditor(user_id,project) || checkRole(user_id,project) ===  "spectator") ? true : false;
}

export { isAdmin, isModerator, isEditor, isSpectator}