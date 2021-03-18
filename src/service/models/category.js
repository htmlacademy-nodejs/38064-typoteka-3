'use strict';

const {Model, DataTypes} = require(`sequelize`);


const CategoryTitleLimit = {
  MIN: 5,
  MAX: 30,
};

class Category extends Model {
}

const define = (sequelize) => Category.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [CategoryTitleLimit.MIN, CategoryTitleLimit.MAX],
    },
  },
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`,
  timestamps: false,
});


module.exports = {
  defineCategory: define,
};
