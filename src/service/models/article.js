'use strict';

const {Model, DataTypes} = require(`sequelize`);


const ArticleTitleLimit = {
  MIN: 30,
  MAX: 250,
};

const ArticleAnnouncementLimit = {
  MIN: 30,
  MAX: 250,
};

const ArticleTextLimit = {
  MIN: 0,
  MAX: 1000,
};

class Article extends Model {
}

/**
 *
 * @param {Sequelize} sequelize
 * @return {Model}
 */
const define = (sequelize) => Article.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [ArticleTitleLimit.MIN, ArticleTitleLimit.MAX],
    },
  },
  image: {
    type: DataTypes.STRING,
  },
  announcement: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [ArticleAnnouncementLimit.MIN, ArticleAnnouncementLimit.MAX],
    },
  },
  text: {
    type: DataTypes.TEXT,
    validate: {
      len: [ArticleTextLimit.MIN, ArticleTextLimit.MAX],
    },
  },
}, {
  sequelize,
  modelName: `Article`,
  tableName: `articles`,
  timestamps: true,
  createdAt: `publication_date`,
});


module.exports = {
  defineArticle: define,
};
