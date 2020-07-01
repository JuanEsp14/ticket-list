const { io } = require('../server');
const { TicketController } = require('../classes/ticket.controller');
const ticketController = new TicketController();

io.on('connection', (client) => {
    console.log('User connected');

    client.on('disconnect', () => {
        console.log('Disconnected user');
    });

    client.on('nextTicket', (data, callback) => {
        let ticket = ticketController.next();
        console.log(ticket);
        callback(ticket);
    });

    client.emit('actualState', {
        ticket: ticketController.getLastTicket()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'Desk is required'
            });
        }

        let attendTicket = ticketController.attendTicket(data.desk);
        callback(attendTicket);
    });

});