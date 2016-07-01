var express = require('express');

var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),
    fs = require('fs');

//Public
app.use(express.static('css'));
app.use(express.static('scripts'));

//Route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//Code
io.sockets.on('connection', function (socket, pseudo) 
{
    socket.on('nouveau_client', function(pseudo) 
    {
        var date = new Date();
        console.log(date.toString() + " : " + pseudo + " s'est connecté(e).");
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });
    socket.on('disconnect', function()
    {
        console.log(socket.pseudo + " s'est déconnecté(e).");
    });

    socket.on('message', function (message) 
    {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 
});

server.listen(8080);