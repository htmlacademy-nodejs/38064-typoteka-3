'use strict';

const generate = require(`./generate`);
const help = require(`./help`);
const server = require(`./server`);
const version = require(`./version`);
const fillDB = require(`./fill-db`);


const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [server.name]: server,
  [version.name]: version,
  [fillDB.name]: fillDB,
};


module.exports = {
  Cli,
};
