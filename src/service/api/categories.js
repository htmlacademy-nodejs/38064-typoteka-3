'use strict';

const express = require(`express`);
const {HttpCode} = require(`../../utils/const`);


/**
 * @param {Router} controller
 * @param {CategoryService} categoryService
 */
const initCategoriesController = (controller, categoryService) => {
  const categoriesController = new express.Router();

  controller.use(`/categories`, categoriesController);

  categoriesController.get(`/`, (req, res) => {
    const categories = categoryService.categories;
    return res.status(HttpCode.OK).json(categories);
  });
};


module.exports = initCategoriesController;
