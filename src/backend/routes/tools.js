import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all tools
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tools');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Get a single tool by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM tools WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Create a new tool
router.post('/', async (req, res, next) => {
  try {
    const { name, category, quantity, location } = req.body;
    if (!name || !category || quantity <= 0 || !location) {
      return res.status(400).json({ error: 'All fields are required, and quantity must be greater than 0' });
    }
    const { rows } = await pool.query(
      'INSERT INTO tools (name, category, quantity, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, category, quantity, location]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Update a tool
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, quantity, location } = req.body;
    if (!name || !category || quantity <= 0 || !location) {
      return res.status(400).json({ error: 'All fields are required, and quantity must be greater than 0' });
    }
    const { rows } = await pool.query(
      'UPDATE tools SET name = $1, category = $2, quantity = $3, location = $4 WHERE id = $5 RETURNING *',
      [name, category, quantity, location, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Delete a tool
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM tools WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    res.json({ message: 'Tool deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;