'use strict';

const {defineCategory} = require(`./category`);
const {defineUser} = require(`./user`);
const {defineArticle} = require(`./article`);


const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const User = defineUser(sequelize);
  const Article = defineArticle(sequelize);

  return {Category, User, Article};
};


module.exports = {
  define,
};
