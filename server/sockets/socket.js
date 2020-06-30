const { io } = require('../server');
const { TicketController } = require('../classes/ticket.controller');
const ticketController = new TicketController();

//Inicialitized communication with frontend
//The client parameter contains information about the connection established
io.on('connection', (client) => {
    console.log('User connected');

    client.on('disconnect', () => {
        console.log('Disconnected user');
    });

    //Listenning the client
    //The callback is received from Client
    client.on('nextTicket', (data, callback) => {
        let ticket = ticketController.next();
        console.log(ticket);
        callback(ticket);
    });

    //Function "emit" is for send information only to Client
    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Hello to this app'
    });

});