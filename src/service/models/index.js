'use strict';

const {Model} = require(`sequelize`);
const {defineCategory} = require(`./category`);
const {defineUser} = require(`./user`);
const {defineArticle} = require(`./article`);
const {defineComment} = require(`./comment`);
const {Alias} = require(`./aliases`);


class ArticlesCategories extends Model {
}

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const User = defineUser(sequelize);
  const Article = defineArticle(sequelize);
  const Comment = defineComment(sequelize);

  Article.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `article_id`});
  Comment.belongsTo(Article, {foreignKey: `article_id`});

  User.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `user_id`});
  Comment.belongsTo(User, {foreignKey: `user_id`});

  ArticlesCategories.init({}, {
    sequelize,
    modelName: `ArticlesCategories`,
    tableName: `articles_categories`,
    timestamps: false,
  });

  Article.belongsToMany(Category, {
    through: ArticlesCategories,
    as: Alias.CATEGORIES,
    foreignKey: `category_id`,
  });
  Category.belongsToMany(Article, {
    through: ArticlesCategories,
    as: Alias.ARTICLES,
    foreignKey: `article_id`,
  });

  return {Category, User, Article, Comment};
};


module.exports = {
  defineModels: define,
};
