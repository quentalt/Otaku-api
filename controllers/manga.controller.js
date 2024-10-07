const pool = require('../database')

// Get all manga
const getAllManga = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM manga')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get manga by ID
const getMangaById = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const result = await pool.query('SELECT * FROM manga WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Manga not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Create new manga
const createManga = async (req, res) => {
    const { title, genre, chapters } = req.body
    try {
        const result = await pool.query(
            'INSERT INTO manga (title, genre, chapters) VALUES ($1, $2, $3) RETURNING *',
            [title, genre, chapters]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Update manga
const updateManga = async (req, res) => {
    const id = parseInt(req.params.id)
    const { title, genre, chapters } = req.body
    try {
        const result = await pool.query(
            'UPDATE manga SET title = $1, genre = $2, chapters = $3 WHERE id = $4 RETURNING *',
            [title, genre, chapters, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Manga not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Delete manga
const deleteManga = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const result = await pool.query('DELETE FROM manga WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Manga not found' })
        }
        res.status(200).json({ message: 'Manga deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    getAllManga,
    getMangaById,
    createManga,
    updateManga,
    deleteManga
}