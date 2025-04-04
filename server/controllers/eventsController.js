const { ObjectId } = require('mongodb');
const { getEventsCollection } = require('../models/eventModel');

async function getEvents(req, res, next) {
  try {
    const collection = await getEventsCollection();
    const filter = {};

    // Optional filtering based on query parameters
    if (req.query.date) {
      filter.date = new Date(req.query.date);
    }
    if (req.query.location) {
      filter.location = req.query.location;
    }
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: "i" };
    }
    const events = await collection.find(filter).toArray();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
}

async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    const collection = await getEventsCollection();
    const event = await collection.findOne({ _id: new ObjectId(id) });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error in getEventById:', error);
    next(error);
  }
}

async function createEvent(req, res, next) {
  try {
    // Log the incoming request body to verify data
    console.log('Incoming event data:', req.body);

    const collection = await getEventsCollection();
    const eventData = req.body;
    eventData.createdAt = new Date();

    // Convert the date string to a JavaScript Date object and log it
    const parsedDate = new Date(eventData.date);
    console.log('Parsed date:', parsedDate);
    eventData.date = parsedDate;

    const result = await collection.insertOne(eventData);
    const newEvent = await collection.findOne({ _id: result.insertedId });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error in createEvent:', error);
    next(error);
  }
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
};
