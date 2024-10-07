const express = require('express')
const router = express.Router()
const animeController = require('../controllers/anime.controller')

// Get all anime
router.get('/', animeController.getAllAnime)

// Get anime by ID
router.get('/:id', animeController.getAnimeById)

// Create new anime
router.post('/', animeController.createAnime)

// Update anime
router.put('/:id', animeController.updateAnime)

// Delete anime
router.delete('/:id', animeController.deleteAnime)

module.exports = router