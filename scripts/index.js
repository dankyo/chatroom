var socket = io.connect('http://localhost:8080');
var pseudo = null;

do {
    pseudo = prompt('Quel est votre pseudo ?');
}
while(pseudo == null || pseudo == undefined || pseudo.trim() == "");

socket.emit('nouveau_client', pseudo);
document.title = document.title + " " + pseudo;

var date = new Date();
insereMessage(">>", "Connecté(e) à " + date.toString());


socket.on('message', function(data) 
{
    insereMessage(data.pseudo, data.message)
})

socket.on('nouveau_client', function(pseudo) 
{
    $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
})

$('#formulaire_chat').submit(function () 
{
    var message = $('#message').val();
    socket.emit('message', message);
    insereMessage(pseudo, message);
    $('#message').val('').focus();
    return false;
});

function insereMessage(pseudo, message) {
    $('#messages').append('<div><strong>' + pseudo + '</strong> ' + message + '</div>');
}