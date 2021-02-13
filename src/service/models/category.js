'use strict';

const {Model, DataTypes} = require(`sequelize`);


const CategoryTitleLimit = {
  MIN: 5,
  MAX: 30,
};

class Category extends Model {
}

/* eslint-disable new-cap */
/**
 * @param {Sequelize} sequelize
 * @return {Model}
 */
const define = (sequelize) => Category.init({
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      len: [CategoryTitleLimit.MIN, CategoryTitleLimit.MAX],
    },
  },
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`,
});
/* eslint-enable new-cap */


module.exports = {
  defineCategory: define,
};
