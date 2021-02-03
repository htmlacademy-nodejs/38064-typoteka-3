'use strict';

const express = require(`express`);
const {HttpCode} = require(`../../utils/const`);


/**
 * @param {Router} controller
 * @param {SearchService} searchService
 */
const initSearchController = (controller, searchService) => {
  const searchController = new express.Router();

  controller.use(`/search`, searchController);

  searchController.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      return res.status(HttpCode.BAD_REQUEST).json([]);
    }

    const searchResult = searchService.find(query);
    const searchStatus = searchResult.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    return res.status(searchStatus).json(searchResult);
  });
};


module.exports = initSearchController;
