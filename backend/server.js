require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');
const deckRoutes = require('./routes/decks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON
app.use('/api/cards', cardRoutes);
app.use('/api/decks', deckRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Example route
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Hello from the backend 👋' });
});

app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});