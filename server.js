var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var port    = 3000;

app.use('/', express.static('./client/dist'));
app.use('/debug', express.static('./client/src'));
http.listen(port, function onListen(){
  console.log('Servidor online na porta: ' + port);
});

var users = [];

io.on('connection', function onConnection(socket) {
  var username = '';

  socket.on('request-users', function onRequestUsers(){
    socket.emit('users', users);
  });

  socket.on('message', function onMessage(msg){
    /** Garante que nao envie com nome alterado */
    msg.username = username;
    if ( msg.toUser !== undefined && msg.toUser !== null && msg.toUser !== "" ) {
      msg.username = username + ' (Privado)';
      io.to(msg.toUser).emit('message', msg);
      msg.username = username + ' (Para: ' + msg.toUser + ')';
      socket.emit('message', msg);
      return;
    }
    io.emit('message', msg);
  })

  socket.on('add-user', function onAddUser(user){
    if ( users.indexOf(user) === -1 ) {
      username = user;
      socket.join(user);
      socket.broadcast.emit('add-user', user);
      users.push(user);
    } else {
      socket.emit('prompt-username', {
        message: 'Nome de usuario já existe, escolha outro.'
      });
    }
  })

  socket.on('disconnect', function onDisconnect(){
    if (username !== '') {
      users.splice(users.indexOf(username), 1);
    }
    io.emit('remove-user', username);
  })
});