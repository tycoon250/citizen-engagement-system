import express from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import db from '../config/db.js';

const router = express.Router();
router.post('/', protect, restrictTo('admin'), (req, res) => {
  const { name, category } = req.body;
  db.query('INSERT INTO agencies (name, category) VALUES (?, ?)', [name, category], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to add agency' });
    res.status(201).json({ message: 'Agency created', id: result.insertId });
  });
});
export default router;
