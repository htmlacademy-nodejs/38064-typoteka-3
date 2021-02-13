'use strict';

const {defineCategory} = require(`./category`);


const define = (sequelize) => {
  const Category = defineCategory(sequelize);

  return {Category};
};


module.exports = {
  define,
};
