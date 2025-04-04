const { getDB } = require('../config/database');
const collectionName = 'rsvps';

const rsvpSchema = {
  bsonType: "object",
  required: ["eventId", "userName", "rsvpStatus"],
  properties: {
    eventId: { bsonType: "objectId", description: "must be an ObjectId and is required" },
    userName: { bsonType: "string", description: "must be a string and is required" },
    rsvpStatus: { bsonType: "string", description: "must be a string and is required" },
    timestamp: { bsonType: "date", description: "timestamp of RSVP" },
  }
};

async function getRSVPCollection() {
  const db = getDB();
  const collections = await db.listCollections({ name: collectionName }).toArray();
  if (collections.length === 0) {
    await db.createCollection(collectionName, {
      validator: { $jsonSchema: rsvpSchema },
    });
  }
  return db.collection(collectionName);
}

module.exports = {
  rsvpSchema,
  getRSVPCollection,
};
