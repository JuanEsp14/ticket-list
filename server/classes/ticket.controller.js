const fs = require('fs');

class TicketController {
    constructor() {
        let data = require('../data/data.json');
        if (data.today != this.today) {
            this.saveData({
                last: 0,
                today: new Date().getDate()
            });
            data = require('../data/data.json');
        }
        this.today = data.today;
        this.last = data.last;
    }

    next() {
        this.last++;
        this.saveData({
            last: this.last,
            today: this.today
        });

        return `Ticket ${this.last}`
    }

    saveData(jsonData) {
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = { TicketController }