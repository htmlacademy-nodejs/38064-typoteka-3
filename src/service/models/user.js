'use strict';

const {Model, DataTypes} = require(`sequelize`);


class User extends Model {
}

/* eslint-disable new-cap */
/**
 * @param {Sequelize} sequelize
 * @return {Model}
 */
const define = (sequelize) => User.init({
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING(50),
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
});
/* eslint-enable new-cap */


module.exports = {
  defineUser: define,
};
