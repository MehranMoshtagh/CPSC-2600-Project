const { ObjectId } = require('mongodb');
const { getRSVPCollection } = require('../models/rsvpModel');

async function createRSVP(req, res, next) {
  try {
    console.log('Incoming RSVP data:', req.body);

    const { id } = req.params; // Event ID
    const rsvpData = req.body;
    const collection = await getRSVPCollection();

    // Check if user already RSVP'd for this event
    const existingRSVP = await collection.findOne({
      eventId: new ObjectId(id),
      userName: rsvpData.userName,
    });

    if (existingRSVP) {
      return res.status(400).json({
        error: `User '${rsvpData.userName}' has already submitted an RSVP for this event.`,
      });
    }

    // If not found, proceed with insertion
    rsvpData.eventId = new ObjectId(id);
    rsvpData.timestamp = new Date();
    const result = await collection.insertOne(rsvpData);
    const newRSVP = await collection.findOne({ _id: result.insertedId });
    res.status(201).json(newRSVP);
  } catch (error) {
    console.error('Error in createRSVP:', error);
    next(error);
  }
}

async function getRSVPs(req, res, next) {
  try {
    const { id } = req.params; // Event ID from URL parameter
    const collection = await getRSVPCollection();
    const rsvps = await collection.find({ eventId: new ObjectId(id) }).toArray();
    res.status(200).json(rsvps);
  } catch (error) {
    console.error('Error in getRSVPs:', error);
    next(error);
  }
}

module.exports = {
  createRSVP,
  getRSVPs,
};
