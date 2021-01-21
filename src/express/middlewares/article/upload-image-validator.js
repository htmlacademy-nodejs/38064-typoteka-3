'use strict';

const path = require(`path`);
const multer = require(`multer`);
const {nanoid} = require(`nanoid`);


const UPLOAD_DIR = `../../upload/img`;
const UPLOAD_FILE_NAME_LENGTH = 12;
const IMG_FIELD_NAME = `upload`;
const INVALID_FILE_TYPE_MESSAGE = `Некорректный тип файла в поле <b>Фотография</b>. Допустимые форматы: <b>jpg</b>, <b>png</b>`;

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, UPLOAD_DIR),
  filename: (request, file, cb) => {
    const uniqueName = nanoid(UPLOAD_FILE_NAME_LENGTH);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const fileFilter = (request, file, cb) => {
  if (file.mimetype === `image/png` || file.mimetype === `image/jpg` || file.mimetype === `image/jpeg`) {
    cb(null, true);
  } else {
    request.customError = INVALID_FILE_TYPE_MESSAGE;
    cb(null, false);
  }
};

const uploadImageValidator = multer({storage, fileFilter}).single(IMG_FIELD_NAME);


module.exports = uploadImageValidator;
