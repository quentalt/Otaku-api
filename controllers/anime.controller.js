const pool = require('../database')

// Get all anime
const getAllAnime = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM anime')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get anime by ID
const getAnimeById = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const result = await pool.query('SELECT * FROM anime WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Anime not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Create new anime
const createAnime = async (req, res) => {
    const { title, genre, episodes } = req.body
    try {
        const result = await pool.query(
            'INSERT INTO anime (title, genre, episodes) VALUES ($1, $2, $3) RETURNING *',
            [title, genre, episodes]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Update anime
const updateAnime = async (req, res) => {
    const id = parseInt(req.params.id)
    const { title, genre, episodes } = req.body
    try {
        const result = await pool.query(
            'UPDATE anime SET title = $1, genre = $2, episodes = $3 WHERE id = $4 RETURNING *',
            [title, genre, episodes, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Anime not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Delete anime
const deleteAnime = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const result = await pool.query('DELETE FROM anime WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Anime not found' })
        }
        res.status(200).json({ message: 'Anime deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    getAllAnime,
    getAnimeById,
    createAnime,
    updateAnime,
    deleteAnime
}