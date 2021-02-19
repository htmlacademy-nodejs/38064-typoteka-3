'use strict';

const {Sequelize} = require(`sequelize`);


const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD} = process.env;

const isNotDefined = [DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD].some((nodeEnv) => nodeEnv === undefined);
if (isNotDefined) {
  throw new Error(`One or more environment variables are not defined`);
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: `postgres`,
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000
  }
});


module.exports = {
  sequelize,
};
