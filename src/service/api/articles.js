'use strict';

const express = require(`express`);
const {HttpCode} = require(`../../utils/const`);
const articleValidator = require(`../middlewares/article-validator`);
const getArticleExistValidator = require(`../middlewares/article-exists`);


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


  articlesController.get(`/:id`, getArticleExistValidator(articleService), (req, res) => {
    const {article} = res.locals;
    res.status(HttpCode.OK).json(article);
  });


  articlesController.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);
    res.status(HttpCode.CREATED).json(article);
  });


  articlesController.put(`/:id`, articleValidator, (req, res) => {
    const {id} = req.params;
    const updatedArticle = articleService.update(id, req.body);

    if (!updatedArticle) {
      res.status(HttpCode.NOT_FOUND).send(`Not found article with id: ${id}`);
    }

    res.status(HttpCode.OK).json(updatedArticle);
  });


  articlesController.delete(`/:id`, getArticleExistValidator(articleService), (req, res) => {
    const {id} = req.params;
    const deletedArticle = articleService.delete(id);

    if (!deletedArticle) {
      res.status(HttpCode.NOT_FOUND).send(`Not found article with id: ${id}`);
    }

    res.status(HttpCode.OK).json(deletedArticle);
  });
};


module.exports = initArticlesController;
