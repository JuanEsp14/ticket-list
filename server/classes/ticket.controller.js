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
                tickets: []
            });
            data = require('../data/data.json');
        }
        this.today = data.today;
        this.last = data.last;
        this.tickets = data.tickets;
    }

    next() {
        this.last++;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveData({
            last: this.last,
            today: this.today,
            tickets: this.tickets
        });

        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    saveData(jsonData) {
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = { TicketController }