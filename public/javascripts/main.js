var socket = io();

socket.emit('username', window.prompt('What\'s your username'));

$('#messages').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('chat event', function(msg){
  console.log(msg);
  $('#messages').append($('<li>').addClass('event').text(msg));
});
