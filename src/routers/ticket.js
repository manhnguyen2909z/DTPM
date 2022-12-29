const express = require('express');
const router = express.Router();
const TicketController = require('../app/controllers/TicketController');


router.get('/', TicketController.home);


module.exports = router;