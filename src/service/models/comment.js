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
    }
  },
}, {
  sequelize,
  modelName: `Comment`,
  tableName: `comments`,
  timestamps: true,
  createdAt: `create_date`,
});


module.exports = {
  defineComment: define,
};
