'use strict';

const {defineCategory} = require(`./category`);
const {defineUser} = require(`./user`);


const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const User = defineUser(sequelize);

  return {Category, User};
};


module.exports = {
  define,
};
