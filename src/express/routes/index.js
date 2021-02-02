'use strict';

const express = require(`express`);
const he = require(`he`);
const api = require(`../api`).getAPI();
const {humanizeDate} = require(`../lib/humanize-date`);
const {highlightInBold} = require(`../lib/highlight-in-bold`);


const mainRouter = new express.Router();

mainRouter.get(`/login`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));


mainRouter.get(`/search`, async (req, res) => {
  const {query: searchQuery} = req.query;

  let articles;
  try {
    articles = await api.searchForArticles(searchQuery);

  } catch (error) {
    articles = [];
  }

  articles.forEach((article) => {
    article.createdDateHumanized = humanizeDate(article.createdDate);
    article.titleHumanized = highlightInBold(he.escape(article.title), searchQuery);
  });

  res.render(`search`, {articles, searchQuery});
});


mainRouter.get(`/`, async (req, res) => {
  let articles;
  try {
    articles = await api.getArticles();
  } catch (error) {
    articles = [];
  }

  articles.forEach((article) => {
    article.createdDateHumanized = humanizeDate(article.createdDate);
  });

  res.render(`main`, {articles});
});


module.exports = mainRouter;
