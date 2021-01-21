'use strict';

const express = require(`express`);
const api = require(`../api`).getAPI();
const {HttpCode} = require(`../../utils/const`);
const uploadImageValidator = require(`../middlewares/article/upload-image-validator`);


const articlesRouter = new express.Router();

articlesRouter.get(`/add`, (req, res) => {
  res.render(`articles/new-post`);
});


articlesRouter.post(`/add`, uploadImageValidator, async (req, res) => {
  const {body, file} = req;

  /** @type {LocalArticle} */
  const newArticle = {
    title: body[`title`],
    picture: file && file.filename,
    announcement: body[`announcement`],
    fullText: body[`full-text`],
    // TODO доработать добавление категорий
    createdDate: new Date().toISOString(),
    // TODO доработать добавление изображения
  };

  try {
    await api.createArticle(newArticle);
    res.redirect(`/my`);

  } catch (error) {
    if (req.customError) {
      error.response.data.push(req.customError);
    }

    res
      .status(HttpCode.BAD_REQUEST)
      .render(`articles/new-post`, {noValidArticle: newArticle, errors: error.response.data});
  }
});


articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id: articleId} = req.params;

  try {
    const article = await api.getArticleById(articleId);
    res.render(`articles/edit-post`, {article});

  } catch (error) {
    // TODO добавить обработку ошибки получения данных о посте
  }
});


articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/publications-by-category`));
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));


module.exports = articlesRouter;
