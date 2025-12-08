const articleRepository = require('../data/articleRepository');

const titleMaxLength = Number(process.env.TITLE_MAX_LENGTH) || 200;
const contentMaxLength = Number(process.env.CONTENT_MAX_LENGTH) || 20000;

exports.getAllArticles = (req, res) => {
  const articles = articleRepository.getAllArticles();

  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
};

exports.getArticleById = (req, res) => {
  const article = articleRepository.getArticleById(req.params.id);

  if (!article) {
    return res.status(404).json({
      status: 'fail',
      message: 'Article is not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
};

exports.validateArticle = (req, res, next) => {
  if (!req.body?.title || !req.body?.content) {
    return res.status(400).json({
      status: 'fail',
      message: 'The article should contain title and content',
    });
  }

  if (
    typeof req.body.title !== 'string' ||
    typeof req.body.content !== 'string'
  ) {
    return res.status(400).json({
      status: 'fail',
      message: 'Title and content must be strings',
    });
  }

  const title = req.body.title.trim();
  const content = req.body.content.trim();

  if (title.length < 1 || title.length > titleMaxLength) {
    return res.status(400).json({
      status: 'fail',
      message: `Article title should contain from 1 to ${titleMaxLength} characters`,
    });
  }

  if (content.length < 1 || content.length > contentMaxLength) {
    return res.status(400).json({
      status: 'fail',
      message: `Article content should contain from 1 to ${contentMaxLength} characters`,
    });
  }

  req.body.title = title;
  req.body.content = content;

  next();
};

exports.createArticle = async (req, res) => {
  const newArticle = articleRepository.createArticle({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await articleRepository.saveArticleToFile();

    res.status(201).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    articleRepository.removeArticleAfterError();

    res.status(500).json({
      status: 'error',
      message: 'There was an error while saving an article. Please try again',
    });
  }
};
