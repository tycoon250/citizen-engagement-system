import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './config/db.js';
import agencyRoutes from './routes/agency.routes.js';
import complaintRoutes from './routes/complaint.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import statsRoutes from './routes/stats.routes.js';
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send('Citizen Engagement System API is running...');
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    }
    console.log('Connected to MySQL');

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);