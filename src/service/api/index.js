'use strict';

const express = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const initArticlesController = require(`./articles`);
const initCategoriesController = require(`./categories`);
const {ArticleService, CategoryService} = require(`../data-service`);


const controller = new express.Router();

(async () => {
  const mockPosts = await getMockData();

  initArticlesController(controller, new ArticleService(mockPosts));
  initCategoriesController(controller, new CategoryService(mockPosts));
})();


module.exports = controller;
