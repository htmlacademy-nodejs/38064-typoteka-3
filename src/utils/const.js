'use strict';

const USER_ARGV_INDEX = 2;

const DEFAULT_COMMAND = `--help`;

const ID_LENGTH = 6;
const API_PREFIX = `/api`;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const HttpMethod = {
  GET: `GET`,
  POST: `POST`,
};

const UploadImageErrorCode = {
  WRONG_TYPE: `WRONG_TYPE`,
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};


module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ID_LENGTH,
  API_PREFIX,
  ExitCode,
  HttpCode,
  HttpMethod,
  UploadImageErrorCode,
  Env,
};
