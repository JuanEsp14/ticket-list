//Connetion with backend
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location('index.html');
    throw new Error('Desk is required');
}

let desk = searchParams.get('desk');
let label = $('small');
$('h1').text('Desk ' + desk);

$('button').on('click', function() {
    socket.emit('attendTicket', { desk: desk }, function(resp) {
        if (resp === 'No tickets') {
            alert(resp);
            label.text(resp);
            return;
        }
        console.log(resp.number);
        label.text('Ticket ' + resp.number);
    });
});