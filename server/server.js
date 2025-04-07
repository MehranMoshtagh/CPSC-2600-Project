const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const { connectToDatabase } = require('./config/database');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const path = require("path");

// Enable CORS
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Mount API routes under /api/v1
app.use('/api/v1', apiRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

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
