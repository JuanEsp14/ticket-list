const fs = require('fs');

class TicketController {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        let data = require('../data/data.json');
        if (data.today != this.today) {
            this.saveNewData();
        }
    }

    saveNewData() {
        let jsonData = {
            last: this.last,
            today: this.today
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = { TicketController }