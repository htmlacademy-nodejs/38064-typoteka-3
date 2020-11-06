'use strict';

const express = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const initArticlesController = require(`./articles`);
const initCategoriesController = require(`./categories`);
const initSearchController = require(`./search`);
const {ArticleService, CategoryService, CommentService, SearchService} = require(`../data-service`);


const controller = new express.Router();

(async () => {
  const mockPosts = await getMockData();

  initArticlesController(controller, new ArticleService(mockPosts), new CommentService());
  initCategoriesController(controller, new CategoryService(mockPosts));
  initSearchController(controller, new SearchService(mockPosts));
})();


module.exports = controller;
