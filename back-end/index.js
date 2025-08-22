import express from 'express';
import router from './routes/routes.js'; // Adjust path if needed
import mongoose from './db/index.js'; // Mongoose instance
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', router);

// MongoDB connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;