const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

//socket.io
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Port and Routes
const PORT = 5000 || process.env.PORT
app.use(require('./router'))

//Middleware
app.use(cors());

io.on('connection', (socket)=> {
   // console.log('we have sockets');
    socket.on('login', ( { name, room }, callback ) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if(error) return callback(error)

        socket.emit('message', { user: 'admin', text:`${user.name} welcome to room ${user.room}`})

        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined`})

        socket.join(user.room);
      
        callback()
    },[]);

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message})

        callback()
    })

    socket.on('disconnect', () => {
        console.log('User has left')
    });
})

server.listen(PORT, ()=>console.log(`Server running on ${PORT}`));