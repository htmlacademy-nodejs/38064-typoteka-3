'use strict';

const {HttpCode} = require(`../../utils/const`);


const REQUIRED_FIELDS = [`title`, `categories`, `announcement`];

const TITLE_LIMIT = {
  MIN: 30,
  MAX: 250,
};

const ANNOUNCEMENT_LIMIT = {
  MIN: 30,
  MAX: 250,
};

const FULL_TEXT_LIMIT = {
  MIN: 0,
  MAX: 1000,
};

const ERROR_TEXT = {
  REQUIRED: `Не указаны обязательные поля:`,
  TITLE_LIMIT: `<b>Заголовок</b> должен быть не менее ${TITLE_LIMIT.MIN} и не более ${TITLE_LIMIT.MAX} символов.`,
  ANNOUNCEMENT_LIMIT: `<b>Анонс</b> должен быть не менее ${ANNOUNCEMENT_LIMIT.MIN} и не более ${ANNOUNCEMENT_LIMIT.MAX} символов.`,
  FULL_TEXT_LIMIT: `<b>Полный текст</b> публикации не должен превышать ${FULL_TEXT_LIMIT.MAX} символов`,
};

const fieldsToText = {
  title: `Заголовок`,
  categories: `Категории`,
  announcement: `Анонс`,
};

const uploadImageErrorCodeToMessage = {
  WRONG_TYPE: `Некорректный тип файла в поле <b>Фотография</b>. Допустимые форматы: <b>jpg</b>, <b>png</b>`,
};

/**
 * @param {string[]} errors
 * @param {LocalArticle} newArticle
 * @return {number}
 */
const checkRequiredFields = (errors, newArticle) => {
  const fields = Object.keys(newArticle);
  const emptyFields = [];

  REQUIRED_FIELDS.forEach((field) => {
    const isExist = fields.includes(field) && newArticle[field];
    if (!isExist) {
      emptyFields.push(field);
    }
  });

  if (emptyFields.length !== 0) {
    const errorText = `${ERROR_TEXT.REQUIRED} ${emptyFields
      .map((field) => (
        `<b>${fieldsToText[field]}</b>`
      ))
      .join(`, `)
    }`;
    errors.push(errorText);
    return -1;
  }

  return 0;
};

/**
 * @param {string[]} errors
 * @param {LocalArticle} newArticle
 * @param {string} field
 * @param {Limit} limit
 * @param {string} errorMessage
 * @return {number}
 */
const checkLimit = (errors, newArticle, field, limit, errorMessage) => {
  if (newArticle.hasOwnProperty(field) && (newArticle[field].length < limit.MIN || newArticle[field].length > limit.MAX)) {
    errors.push(errorMessage);
    return -1;
  }

  return 0;
};

/**
 * @param {string[]} errors
 * @param {string} fileData
 * @return {number}
 */
const checkUploadedImage = (errors, fileData) => {
  if (Object.keys(uploadImageErrorCodeToMessage).includes(fileData)) {
    errors.push(uploadImageErrorCodeToMessage[fileData]);
    return -1;
  }

  return 0;
};

const articleValidator = (req, res, next) => {
  const newArticle = req.body;
  const errors = [];

  checkRequiredFields(errors, newArticle);
  checkLimit(errors, newArticle, `title`, TITLE_LIMIT, ERROR_TEXT.TITLE_LIMIT);
  checkLimit(errors, newArticle, `announcement`, ANNOUNCEMENT_LIMIT, ERROR_TEXT.ANNOUNCEMENT_LIMIT);
  checkLimit(errors, newArticle, `fullText`, FULL_TEXT_LIMIT, ERROR_TEXT.FULL_TEXT_LIMIT);

  if (newArticle.picture) {
    checkUploadedImage(errors, newArticle.picture);
  }
  // TODO валидация даты

  if (errors.length > 0) {
    return res.status(HttpCode.BAD_REQUEST).json(errors);
  }

  return next();
};


module.exports = articleValidator;


/**
 * @typedef {Object} Limit
 * @property {number} MIN
 * @property {number} MAX
 */
