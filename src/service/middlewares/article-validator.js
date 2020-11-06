'use strict';

const {HttpCode} = require(`../../utils/const`);


const articleKeys = [`title`, `announce`, `fullText`, `category`, `createdDate`];

const articleValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const isKeysExists = articleKeys.every((key) => keys.includes(key));

  if (!isKeysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. The article data is not valid`);
  }

  return next();
};


module.exports = articleValidator;
