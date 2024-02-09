//BACK END van chatcord

//regelt alles op de server voor de chat. 
//Het maakt een server, laat gebruikers berichten versturen en bijhoudt wie er in de chatroom is.


const path = require('path');

//setup the server (HTTP)
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);




//set static folder (om de public files te krijgen)
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'JungleChat Bot';


//run when client connects
       //luisterd naar connection
io.on('connection', socket => {
       socket.on('joinRoom', ({ username, room }) => {
              const user = userJoin(socket.id, username, room); 
              
              socket.join(user.room)


       //welcome een user
       socket.emit('message', formatMessage(botName, 'welcome to JungleChat!')); 

       //broadcast when a user connects (alleen gebruiker)
       socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} connected the chat`));

       // send users and room info
       io.to(user.room).emit("roomUsers", {
              room: user.room,
              users: getRoomUsers(user.room),
            });

    });
    
   // Listen for chatMessage
   socket.on('chatMessage', msg => {
       const user = getCurrentUser(socket.id);
       
    io.to(user.room).emit('message', formatMessage(user.username, msg));
   });
 
   //run wanneer client disconnect (hele chat)
   socket.on('disconnect', () => {
       const user = userLeave(socket.id);

       if (user) {
        io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

       // send users and room info
       io.to(user.room).emit("roomUsers", {
              room: user.room,
              users: getRoomUsers(user.room),
            });


       }
    
   });
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));