'use strict';

const {HttpCode} = require(`../../utils/const`);


/**
 * @param {ArticleService} service
 * @return {function}
 */
const getArticleExistValidator = (service) => (req, res, next) => {
  const {id} = req.params;
  const article = service.getById(id);

  if (!article) {
    return res.status(HttpCode.NOT_FOUND).send(`Not found article with id: ${id}`);
  }

  res.locals.article = article;

  return next();
};


module.exports = getArticleExistValidator;
