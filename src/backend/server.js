import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import wardenRoutes from './routes/wardens.js';
import toolRoutes from './routes/tools.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/wardens', wardenRoutes);
app.use('/api/tools', toolRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});