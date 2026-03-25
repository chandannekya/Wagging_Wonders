const Article = require('../models/Article');

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addArticle = async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).json({ success: true, article: newArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
    res.status(200).json({ success: true, article });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
