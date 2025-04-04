const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/eventsController');
const rsvpController = require('../controllers/rsvpController');
const { validateEvent, validateRSVP } = require('../middleware/validateData');

// Events endpoints
router.get('/', eventsController.getEvents);
router.get('/:id', eventsController.getEventById);
router.post('/', validateEvent, eventsController.createEvent);

// RSVP endpoints (nested under events)
router.post('/:id/rsvp', validateRSVP, rsvpController.createRSVP);
router.get('/:id/rsvps', rsvpController.getRSVPs);

module.exports = router;
