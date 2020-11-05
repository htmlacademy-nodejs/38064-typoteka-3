'use strict';

const express = require(`express`);
const {HttpCode} = require(`../../utils/const`);


/**
 * @param {Router} controller
 * @param {ArticleService} articleService
 */
const initArticlesController = (controller, articleService) => {
  const articlesController = new express.Router();

  controller.use(`/articles`, articlesController);

  articlesController.get(`/`, (req, res) => {
    const articles = articleService.articles;
    res.status(HttpCode.OK).json(articles);
  });
};


module.exports = initArticlesController;
