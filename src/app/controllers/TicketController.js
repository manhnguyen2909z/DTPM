const Ticket = require('../models/Ticket');
const { mutipleMongooseToOBject } = require('../../until/mongoose');

class TicketController {
    home(req, res, next) {
        Ticket.find({})
            .then((ticket) => {
                res.render('home', {
                    ticket: mutipleMongooseToOBject(ticket),
                });
            })
            .catch(next);
    }
}

module.exports = new TicketController();
