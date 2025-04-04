const { MongoClient } = require('mongodb');
const { MONGODB_URI } = require('./env');

let db;

async function connectToDatabase() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(); // Uses the database specified in your URI
  console.log('Connected to MongoDB Atlas');
  return db;
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return db;
}

module.exports = {
  connectToDatabase,
  getDB,
};
