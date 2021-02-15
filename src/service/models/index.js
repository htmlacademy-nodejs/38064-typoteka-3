'use strict';

const {defineCategory} = require(`./category`);
const {defineUser} = require(`./user`);
const {defineArticle} = require(`./article`);
const {defineComment} = require(`./comment`);


const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const User = defineUser(sequelize);
  const Article = defineArticle(sequelize);
  const Comment = defineComment(sequelize);

  return {Category, User, Article, Comment};
};


module.exports = {
  define,
};
