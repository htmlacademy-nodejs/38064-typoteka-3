'use strict';

const express = require(`express`);
const request = require(`supertest`);
const initCategoriesController = require(`./categories`);
const {HttpCode} = require(`../../utils/const`);
const {CategoryService} = require(`../data-service`);
const mockData = require(`./categories.e2e.test.mock.json`);


const app = express();
app.use(express.json());
initCategoriesController(app, new CategoryService(mockData));


describe(`API return category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 9`, () => expect(response.body.length).toBe(9));

  test(`Category names are "Без рамки", "Разное", "За жизнь", "Железо", "Программирование", "Деревья", "IT", "Музыка", "Кино"`, () => (
    expect(response.body).toEqual(expect.arrayContaining(
        [`Без рамки`, `Разное`, `За жизнь`, `Железо`, `Программирование`, `Деревья`, `IT`, `Музыка`, `Кино`]
    ))
  ));
});
