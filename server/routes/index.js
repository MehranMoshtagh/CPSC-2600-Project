const express = require('express');
const router = express.Router();

const eventsRoutes = require('./eventsRoutes');

router.use('/events', eventsRoutes);

module.exports = router;
