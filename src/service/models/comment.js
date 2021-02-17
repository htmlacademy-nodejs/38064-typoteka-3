'use strict';

const {Model, DataTypes} = require(`sequelize`);


const CommentTextLimit = {
  MIN: 20,
  MAX: Infinity,
};

class Comment extends Model {
}

const define = (sequelize) => Comment.init({
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [CommentTextLimit.MIN, CommentTextLimit.MAX],
    },
  },
}, {
  sequelize,
  modelName: `Comment`,
  tableName: `comments`,
  createdAt: `create_date`,
  updatedAt: `updated_at`,
});


module.exports = {
  defineComment: define,
};
