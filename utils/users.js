//zoals joinen en leaven komt hier binnen (functions)
//houdt de gebruikers bij die in de chatroom zijn. 
//Het voegt nieuwe gebruikers toe, vindt de huidige gebruiker, en verwijdert gebruikers als ze de chat verlaten.


const users = [];

//join user to chat
function userJoin(id, username, room) {
    const user = {id, username, room}; //object

    users.push(user);

    return user;
}
 
//get current user

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// user leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// get room users 
function getRoomUsers(room) {
    return users.filter(user => user.room === room)

}

module.exports = {

    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
}