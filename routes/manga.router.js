const express = require('express')
const router = express.Router()
const mangaController = require('../controllers/manga.controller')

// Get all manga
router.get('/', mangaController.getAllManga)

// Get manga by ID
router.get('/:id', mangaController.getMangaById)

// Create new manga
router.post('/', mangaController.createManga)

// Update manga
router.put('/:id', mangaController.updateManga)

// Delete manga
router.delete('/:id', mangaController.deleteManga)

module.exports = router