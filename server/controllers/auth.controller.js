import bcrypt from 'bcrypt';
import db from '../config/db.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (results.length > 0) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, role || 'citizen'], (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' });

      const newUser = { id: result.insertId, name, email, role };
      res.status(201).json({ user: newUser, token: generateToken(newUser) });
    });
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user),
    });
  });
};
