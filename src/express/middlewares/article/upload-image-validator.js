'use strict';

const path = require(`path`);
const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const {UploadImageErrorCode} = require(`../../../utils/const`);


const UPLOAD_DIR = `../../upload/img`;
const UPLOAD_FILE_NAME_LENGTH = 12;
const IMG_FIELD_NAME = `upload`;
/** Байт в 10 мегабайтах */
const UPLOAD_MAX_LIMIT = 10485760;

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, UPLOAD_DIR),
  filename: (request, file, cb) => {
    const uniqueName = nanoid(UPLOAD_FILE_NAME_LENGTH);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const fileFilter = (req, file, next) => {
  if (file.mimetype === `image/jpg` || file.mimetype === `image/jpeg` || file.mimetype === `image/png`) {
    return next(null, true);
  }

  const error = new Error(UploadImageErrorCode.WRONG_TYPE);
  error.code = UploadImageErrorCode.WRONG_TYPE;
  return next(error);
};

const limits = {
  fileSize: UPLOAD_MAX_LIMIT,
};

const uploadImage = multer({storage, fileFilter, limits}).single(IMG_FIELD_NAME);


module.exports = uploadImage;
