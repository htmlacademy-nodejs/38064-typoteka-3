'use strict';

const express = require(`express`);
const api = require(`../api`).getAPI();
const {HttpCode} = require(`../../utils/const`);
const uploadImage = require(`../middlewares/article/upload-image-validator`);


const articlesRouter = new express.Router();

articlesRouter.get(`/add`, async (req, res) => {
  let categories;
  try {
    // TODO доработать работу с категориями после добавления БД
    // categories = await api.getCategories();
    categories = [];

  } catch (error) {
    categories = [];
  }

  res.render(`articles/new-post`, {categories});
});


articlesRouter.post(`/add`,
    (req, res, next) => {
      uploadImage(req, res, (error) => {
        if (error) {
          res.locals.uploadError = error.code;
        }
        next();
      });

    }, async (req, res) => {
      const {body, file} = req;

      const date = body.date === `` ? new Date() : new Date(body.date);

      /** @type {LocalArticle} */
      const newArticle = {
        title: body[`title`],
        picture: file && file.filename || res.locals.uploadError,
        announcement: body[`announcement`],
        fullText: body[`full-text`],
        createdDate: date,
        // TODO доработать добавление категорий
        categories: [],
      };

      try {
        await api.createArticle(newArticle);
        res.redirect(`/my`);

      } catch (error) {
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
