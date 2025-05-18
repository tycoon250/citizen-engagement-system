import express from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create admin
router.post('/admin', protect, restrictTo('admin'), async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "admin")',
    [name, email, hashed],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to add admin' });
      res.status(201).json({ message: 'Admin user created' });
    }
  );
});

// Create agency user
router.post('/agency', protect, restrictTo('admin'), async (req, res) => {
  const { name, email, password, agency_id } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users (name, email, password, role, agency_id) VALUES (?, ?, ?, "agency", ?)',
    [name, email, hashed, agency_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to add agency user' });
      res.status(201).json({ message: 'Agency user created' });
    }
  );
});

export default router;
