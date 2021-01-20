'use strict';

const path = require(`path`);
const express = require(`express`);
const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const api = require(`../api`).getAPI();
const {HttpCode} = require(`../../utils/const`);


const UPLOAD_DIR = `../upload/img`;
const UPLOAD_FILE_NAME_LENGTH = 12;
const IMG_FIELD_NAME = `upload`;

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueName = nanoid(UPLOAD_FILE_NAME_LENGTH);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});
const uploadFormData = multer({storage});

const articlesRouter = new express.Router();

articlesRouter.get(`/add`, (req, res) => {
  res.render(`articles/new-post`);
});


articlesRouter.post(`/add`, uploadFormData.single(IMG_FIELD_NAME), async (req, res) => {
  const {body, file} = req;

  /** @type {LocalArticle} */
  const newArticle = {
    title: body[`title`],
    announce: body[`announcement`],
    fullText: body[`full-text`],
    // TODO доработать добавление категорий
    categories: [],
    createdDate: new Date().toISOString(),
    // TODO доработать добавление изображения
    picture: file && file.filename,
  };

  try {
    await api.createArticle(newArticle);
    res.redirect(`/my`);

  } catch (error) {
    res
      .status(HttpCode.BAD_REQUEST)
      .render(`articles/new-post`, {noValidArticle: newArticle});
  }
});


articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id: articleId} = req.params;

  try {
    const article = await api.getArticleById(articleId);
    res.render(`articles/edit-post`, {article});

  } catch (error) {
    // TODO добавить обработку ошибки получения данных о посте
  }
});


articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/publications-by-category`));
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));


module.exports = articlesRouter;
