const { v4: uuidv4 } = require('uuid');

exports.getAllArticles = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(err.status).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  }
};

exports.getArticleById = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(err.status).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  }
};

exports.createArticle = (req, res) => {
  try {
    const newArticle = {
      ...req.body,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    if (!req.body.title || !req.body.content) {
      res.status(400).json({
        status: 400,
        message: 'The article should contain title and content',
      });
    }

    res.status(201).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    res.status(err.status).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  }
};
