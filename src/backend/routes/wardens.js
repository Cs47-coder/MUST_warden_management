import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all wardens
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM wardens');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Get a single warden by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM wardens WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Warden not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Create a new warden
router.post('/', async (req, res, next) => {
  try {
    const { name, position, area, contact } = req.body;
    if (!name || !position || !area || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const { rows } = await pool.query(
      'INSERT INTO wardens (name, position, area, contact) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, position, area, contact]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Update a warden
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, position, area, contact } = req.body;
    if (!name || !position || !area || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const { rows } = await pool.query(
      'UPDATE wardens SET name = $1, position = $2, area = $3, contact = $4 WHERE id = $5 RETURNING *',
      [name, position, area, contact, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Warden not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Delete a warden
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM wardens WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Warden not found' });
    }
    res.json({ message: 'Warden deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;