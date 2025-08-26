import express from 'express';
import router from './routes/routes.js'; // Adjust path if needed
import mongoose from './db/index.js'; // Mongoose instance
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;

// Routes
app.use('/api', router);

// app.get('/', (req, res) => {
//     res.send('API is running');
// });

// MongoDB connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

app.get("/favicon.ico", (req, res) => res.status(204).end());


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;