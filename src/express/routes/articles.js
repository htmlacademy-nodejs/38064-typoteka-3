'use strict';

const {Router} = require(`express`);


const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => res.render(`articles/new-post`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`articles/new-post`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/publications-by-category`));
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));


module.exports = articlesRouter;
