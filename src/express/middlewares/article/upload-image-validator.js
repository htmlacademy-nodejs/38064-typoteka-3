'use strict';

const path = require(`path`);
const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const {UploadImageErrorCode} = require(`../../../utils/const`);


const UPLOAD_DIR = `../../upload/img`;
const UPLOAD_FILE_NAME_LENGTH = 12;
const IMG_FIELD_NAME = `upload`;

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

  return next(new Error(UploadImageErrorCode.WRONG_TYPE));
};

const uploadImage = multer({storage, fileFilter}).single(IMG_FIELD_NAME);


module.exports = uploadImage;
