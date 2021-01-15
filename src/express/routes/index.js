'use strict';

const express = require(`express`);
const api = require(`../api`).getAPI();


const mainRouter = new express.Router();

mainRouter.get(`/login`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));
mainRouter.get(`/search`, (req, res) => res.render(`search`));


mainRouter.get(`/`, async (req, res) => {
  let articles;
  try {
    articles = await api.getArticles();
  } catch (error) {
    articles = [];
  }

  res.render(`main`, {articles});
});


module.exports = mainRouter;
