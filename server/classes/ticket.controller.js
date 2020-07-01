const fs = require('fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketController {
    constructor() {
        let data = require('../data/data.json');
        if (data.today != this.today) {
            this.saveData({
                last: 0,
                today: new Date().getDate(),
                tickets: [],
                last4Tickets: []
            });
            data = require('../data/data.json');
        }
        this.today = data.today;
        this.last = data.last;
        this.tickets = data.tickets;
        this.last4Tickets = data.last4Tickets;
    }

    next() {
        this.last++;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveData({
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4Tickets: this.last4Tickets
        });

        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }
    getLast4() {
        return this.last4Tickets;
    }

    attendTicket(desk) {
        if (this.tickets.length === 0) {
            return 'No tickets';
        }
        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(ticketNumber, desk);
        this.last4Tickets.unshift(attendTicket);

        if (this.last4Tickets.length > 4) {
            this.last4Tickets.splice(-1, 1);
        }

        this.saveData({
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4Tickets: this.last4Tickets
        });

        return attendTicket;
    }


    saveData(jsonData) {
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = { TicketController }