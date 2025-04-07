const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const path = require("path");

const { connectToDatabase } = require('./config/database');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

// Enable CORS
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Mount API routes under /api/v1
app.use('/api/v1', apiRoutes);

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "public/build")));

// Serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/build", "index.html"));
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 443;

async function startServer() {
  try {
    // Connect to MongoDB Atlas before starting the server
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

startServer();
