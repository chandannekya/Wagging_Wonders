const express = require('express');
const { getArticles, addArticle, getArticleById } = require('../controllers/blogController');
const router = express.Router();

router.get('/', getArticles);
router.post('/add', addArticle);
router.get('/:id', getArticleById);

module.exports = router;
