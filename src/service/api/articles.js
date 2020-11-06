'use strict';

const express = require(`express`);
const {HttpCode} = require(`../../utils/const`);
const articleValidator = require(`../middlewares/article-validator`);
const commentValidator = require(`../middlewares/comment-validator`);
const getArticleExistValidator = require(`../middlewares/article-exists`);


/**
 * @param {Router} controller
 * @param {ArticleService} articleService
 * @param {CommentService} commentService
 */
const initArticlesController = (controller, articleService, commentService) => {
  const articlesController = new express.Router();

  controller.use(`/articles`, articlesController);

  articlesController.get(`/`, (req, res) => {
    const articles = articleService.articles;
    return res.status(HttpCode.OK).json(articles);
  });


  articlesController.get(`/:id`, getArticleExistValidator(articleService), (req, res) => {
    const {article} = res.locals;
    return res.status(HttpCode.OK).json(article);
  });


  articlesController.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);
    return res.status(HttpCode.CREATED).json(article);
  });


  articlesController.put(`/:id`, articleValidator, (req, res) => {
    const {id} = req.params;
    const updatedArticle = articleService.update(id, req.body);

    if (!updatedArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id: ${id}`);
    }

    return res.status(HttpCode.OK).json(updatedArticle);
  });


  articlesController.delete(`/:id`, getArticleExistValidator(articleService), (req, res) => {
    const {id} = req.params;
    const deletedArticle = articleService.delete(id);

    if (!deletedArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id: ${id}`);
    }

    return res.status(HttpCode.OK).json(deletedArticle);
  });


  articlesController.get(`/:id/comments`, getArticleExistValidator(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.getAll(article);
    return res.status(HttpCode.OK).json(comments);
  });


  articlesController.post(`/:id/comments`, [getArticleExistValidator(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const newComment = commentService.create(article, req.body);
    return res.status(HttpCode.CREATED).json(newComment);
  });


  articlesController.delete(`/:id/comments/:commentId`, getArticleExistValidator(articleService), (req, res) => {
    const {article} = res.locals;
    const {id, commentId} = req.params;
    const deletedComment = commentService.delete(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id: ${id}`);
    }

    return res.status(HttpCode.OK).json(deletedComment);
  });
};


module.exports = initArticlesController;
