'use strict';

const express = require(`express`);
const api = require(`../api`).getAPI();
const {HttpCode} = require(`../../utils/const`);
const uploadImage = require(`../middlewares/article/upload-image-validator`);
const {humanizeDate} = require(`../lib/humanize-date`);


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
        // TODO корректно организовать структуры данных отдельно на фронте и на бэке
        await api.createArticle(newArticle);
        res.redirect(`/my`);

      } catch (error) {
        const categories = [];
        // TODO доработать категории после добавления БД
        // categories = await api.getCategories();

        const article = Object.assign({}, newArticle, {
          createdDate: body.date,
        });

        res
          .status(HttpCode.BAD_REQUEST)
          .render(`articles/new-post`, {categories, article, errors: error.response.data});
      }
    });


articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id: articleId} = req.params;

  try {
    const [article, categories] = await Promise.all([
      api.getArticleById(articleId),
      // TODO доработать категории после добавления БД
      // api.getCategories(),
      [],
    ]);

    article.createdDateHumanized = humanizeDate(article.createdDate, true);

    res.render(`articles/new-post`, {isEdit: true, categories, article});

  } catch (error) {
    // TODO добавить обработку ошибки получения данных о посте. Пока не очень понятно что показать пользователю, если не получилось получить данные о публикации
  }
});


// eslint-disable-next-line no-unused-vars
articlesRouter.post(`/edit/:id`, async (req, res) => {
  // TODO доработать редактирование публикаций
});


articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/publications-by-category`));
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));


module.exports = articlesRouter;
