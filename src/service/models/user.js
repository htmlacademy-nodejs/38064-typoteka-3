'use strict';

const {Model, DataTypes} = require(`sequelize`);


class User extends Model {
}

const define = (sequelize) => User.init({
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: `first_name`,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: `last_name`,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    field: `password_hash`,
  }
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`,
  createdAt: `created_at`,
  updatedAt: `updated_at`,
  paranoid: true,
  deletedAt: `deleted_at`,
});


module.exports = {
  defineUser: define,
};
