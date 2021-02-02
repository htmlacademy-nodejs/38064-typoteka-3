'use strict';

const express = require(`express`);
const {humanizeDate} = require(`../lib/humanize-date`);
const api = require(`../api`).getAPI();


const myRouter = new express.Router();

myRouter.get(`/comments`, async (req, res) => {
  let comments;
  try {
    let articles = await api.getArticles();

    articles = articles.slice(0, 3);
    comments = await Promise.all(
        articles.map((article) => api.getComments(article.id))
    ).then((result) => result.flat());

  } catch (error) {
    comments = [];
  }

  res.render(`my/comments`, {comments});
});


myRouter.get(`/`, async (req, res) => {
  let articles;
  try {
    articles = await api.getArticles();
  } catch (error) {
    articles = [];
  }

  articles.forEach((article) => {
    article.createdDateHumanized = humanizeDate(article.createdDate);
  });

  res.render(`my/my`, {articles});
});


module.exports = myRouter;
