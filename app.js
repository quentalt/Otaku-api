const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const { Manga, Anime } = require('./models');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const PORT = 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Otaku API',
      version: '1.0.0',
    },
  },
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.use(bodyParser.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Manga:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - chapters
 *         - author
 *         - releaseDate
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         title:
 *           type: string
 *           description: Le titre du manga
 *         type:
 *           type: string
 *           enum: [manga, manhwa]
 *           description: Type de l'œuvre
 *         chapters:
 *           type: integer
 *           description: Nombre de chapitres
 *         author:
 *           type: string
 *           description: Auteur du manga
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Date de sortie
 *         status:
 *           type: string
 *           enum: [ongoing, completed]
 *           description: Statut du manga
 *         rating:
 *           type: number
 *           description: Note moyenne du manga
 *           minimum: 0
 *           maximum: 10
 *         genre:
 *           type: string
 *           description: Genre du manga
 *         illustrator:
 *           type: string
 *           description: Illustrateur du manga
 *         volume_count:
 *           type: integer
 *           description: Nombre de volumes
 *         language:
 *           type: string
 *           description: Langue du manga
 *         demographic:
 *           type: string
 *           description: Démographie du manga
 *         serialization:
 *           type: string
 *           description: Sérialisation du manga
 *     Anime:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - episodes
 *         - releaseDate
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         title:
 *           type: string
 *           description: Le titre de l'anime
 *         type:
 *           type: string
 *           enum: [anime, drama]
 *           description: Type de l'œuvre
 *         episodes:
 *           type: integer
 *           description: Nombre d'épisodes
 *         studio:
 *           type: string
 *           description: Studio de production
 *         genre:
 *           type: string
 *           description: Genre de l'anime
 *         duration:
 *           type: integer
 *           description: Durée de chaque épisode
 *         language:
 *           type: string
 *           description: Langue de l'anime
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Date de sortie
 *         status:
 *           type: string
 *           enum: [ongoing, completed]
 *           description: Statut de l'anime
 *         rating:
 *           type: number
 *           description: Note moyenne de l'anime
 *           minimum: 0
 *           maximum: 10
 *         synopsis:
 *           type: string
 *           description: Synopsis de l'anime
 *         link:
 *           type: string
 *           description: Lien vers l'anime
 *         director:
 *           type: string
 *           description: Réalisateur de l'anime
 *         season:
 *           type: integer
 *           description: Numéro de la saison
 *         has_manga:
 *           type: boolean
 *           description: Indique si l'anime a un manga associé
 *         age_rating:
 *           type: string
 *           description: Classification par âge
 *         network:
 *           type: string
 *           description: Réseau de diffusion
 *         airing_time:
 *           type: string
 *           description: Heure de diffusion
 */

/**
 * @swagger
 * /mangas:
 *   post:
 *     summary: Créer un nouveau manga
 *     tags: [Manga]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manga'
 *     responses:
 *       201:
 *         description: Manga créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manga'
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur serveur
 */
app.post('/mangas', [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('type').isIn(['manga', 'manhwa']).withMessage('Type must be "manga" or "manhwa"'),
  body('chapters').isInt({ min: 1 }).withMessage('Chapters must be an integer greater than 0'),
  body('author').not().isEmpty().withMessage('Author is required'),
  body('genre').not().isEmpty().withMessage('Genre is required'),
  body('releaseDate').isISO8601().withMessage('Release date must be a valid date'),
  body('status').isIn(['ongoing', 'completed']).withMessage('Status must be "ongoing" or "completed"'),
  body('rating').optional().isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newManga = await Manga.create(req.body);
    res.status(201).json(newManga);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create manga' });
  }
});

/**
 * @swagger
 * /mangas:
 *   get:
 *     summary: Récupérer tous les mangas
 *     tags: [Manga]
 *     responses:
 *       200:
 *         description: Liste de tous les mangas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Manga'
 *       500:
 *         description: Erreur serveur
 */
app.get('/mangas', async (req, res) => {
  const mangas = await Manga.findAll();
  res.json(mangas);
});

/**
 * @swagger
 * /mangas/{id}:
 *   put:
 *     summary: Mettre à jour un manga
 *     tags: [Manga]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du manga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manga'
 *     responses:
 *       200:
 *         description: Manga mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manga'
 *       404:
 *         description: Manga non trouvé
 *       500:
 *         description: Erreur serveur
 */
app.put('/mangas/:id', async (req, res) => {
  const id = req.params.id;
  const manga = await Manga.findByPk(id);
  if (manga) {
    await manga.update(req.body);
    res.json(manga);
  } else {
    res.status(404).json({ error: 'Manga not found' });
  }
});

/**
 * @swagger
 * /mangas/{id}:
 *   delete:
 *     summary: Supprimer un manga
 *     tags: [Manga]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du manga
 *     responses:
 *       200:
 *         description: Manga supprimé avec succès
 *       404:
 *         description: Manga non trouvé
 *       500:
 *         description: Erreur serveur
 */
app.delete('/mangas/:id', async (req, res) => {
  const id = req.params.id;
  const manga = await Manga.findByPk(id);
  if (manga) {
    await manga.destroy();
    res.json({ message: 'Manga deleted' });
  } else {
    res.status(404).json({ error: 'Manga not found' });
  }
});

/**
 * @swagger
 * /animes:
 *   post:
 *     summary: Créer un nouvel anime
 *     tags: [Anime]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Anime'
 *     responses:
 *       201:
 *         description: Anime créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anime'
 *       500:
 *         description: Erreur serveur
 */
app.post('/animes', async (req, res) => {
  const newAnime = await Anime.create(req.body);
  res.status(201).json(newAnime);
});

/**
 * @swagger
 * /animes:
 *   get:
 *     summary: Récupérer tous les animes
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: Liste de tous les animes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anime'
 *       500:
 *         description: Erreur serveur
 */
app.get('/animes', async (req, res) => {
  const animes = await Anime.findAll();
  res.json(animes);
});

/**
 * @swagger
 * /animes/{id}:
 *   put:
 *     summary: Mettre à jour un anime
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'anime
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Anime'
 *     responses:
 *       200:
 *         description: Anime mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anime'
 *       404:
 *         description: Anime non trouvé
 *       500:
 *         description: Erreur serveur
 */
app.put('/animes/:id', async (req, res) => {
  const id = req.params.id;
  const anime = await Anime.findByPk(id);
  if (anime) {
    await anime.update(req.body);
    res.json(anime);
  } else {
    res.status(404).json({ error: 'Anime not found' });
  }
});

/**
 * @swagger
 * /animes/{id}:
 *   delete:
 *     summary: Supprimer un anime
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'anime
 *     responses:
 *       200:
 *         description: Anime supprimé avec succès
 *       404:
 *         description: Anime non trouvé
 *       500:
 *         description: Erreur serveur
 */
app.delete('/animes/:id', async (req, res) => {
  const id = req.params.id;
  const anime = await Anime.findByPk(id);
  if (anime) {
    await anime.destroy();
    res.json({ message: 'Anime deleted' });
  } else {
    res.status(404).json({ error: 'Anime not found' });
  }
});



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('API documentation available at http://localhost:3000/api-docs');
});