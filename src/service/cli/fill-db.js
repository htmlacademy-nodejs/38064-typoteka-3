'use strict';

const {ExitCode} = require(`../../utils/const`);
const {getLogger} = require(`../lib/logger`);
const {sequelize} = require(`../lib/sequelize`);
const {initSchemaDB} = require(`../lib/init-schema-db`);


const logger = getLogger({});

const run = async () => {
  try {
    logger.info(`Trying to connect to database...`);
    await sequelize.authenticate();

  } catch (err) {
    logger.error(`Error with DB connection: ${err.message}`);
    process.exit(ExitCode.ERROR);
  }
  logger.info(`Connection to database established`);

  await initSchemaDB(sequelize);

  await sequelize.close();
};


module.exports = {
  name: `--filldb`,
  run,
};
