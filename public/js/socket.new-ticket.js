//Connetion with backend
var socket = io();
var label = $('#lblNewTicket');

socket.on('connect', () => {
    console.log('Server connected');
});

socket.on('disconnect', () => {
    console.log('Server disconnected');
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});