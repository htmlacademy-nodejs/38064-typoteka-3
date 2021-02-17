'use strict';

const {defineModels} = require(`../models/index`);


const {DB_SCHEMA} = process.env;

const initSchemaDB = async (sequelize) => {
  const {} = defineModels(sequelize);
  await sequelize.createSchema(DB_SCHEMA);
  await sequelize.sync({force: true});
};


module.exports = {
  initSchemaDB,
};
