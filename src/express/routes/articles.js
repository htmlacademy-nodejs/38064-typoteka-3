'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();


const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => {


  res.render(`articles/new-post`);
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
