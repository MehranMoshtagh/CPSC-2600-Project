const { getDB } = require('../config/database');
const collectionName = 'events';

const eventSchema = {
  bsonType: "object",
  required: ["name", "date", "location"],
  properties: {
    name: { bsonType: "string", description: "must be a string and is required" },
    description: { bsonType: "string", description: "optional event description" },
    date: { bsonType: "date", description: "must be a valid date and is required" },
    location: { bsonType: "string", description: "must be a string and is required" },
    organizer: { bsonType: "string", description: "optional organizer information" },
    createdAt: { bsonType: "date", description: "timestamp of event creation" },
  }
};

async function getEventsCollection() {
  const db = getDB();
  const collections = await db.listCollections({ name: collectionName }).toArray();
  if (collections.length === 0) {
    await db.createCollection(collectionName, {
      validator: { $jsonSchema: eventSchema },
    });
  }
  return db.collection(collectionName);
}

module.exports = {
  eventSchema,
  getEventsCollection,
};
