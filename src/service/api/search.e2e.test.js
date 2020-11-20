'use strict';

const express = require(`express`);
const request = require(`supertest`);
const initSearchController = require(`./search`);
const {HttpCode} = require(`../../utils/const`);
const {SearchService} = require(`../data-service`);
const mockData = require(`./search.e2e.test.mock.json`);


const app = express();
app.use(express.json());
initSearchController(app, new SearchService(mockData));


describe(`API returns article based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: `камни бесконечности`,
    });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`1 article was found`, () => expect(response.body.length).toBe(1));

  test(`Article has correct id`, () => expect(response.body[0].id).toBe(`z1tdJd`));
});

test(`API returns code 404 if nothing is found`, () => {
  return request(app)
    .get(`/search`)
    .query({
      query: `Как собрать камни конечности`,
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns code 400 when query string is absent`, () => {
  return request(app)
    .get(`/search`)
    .expect(HttpCode.BAD_REQUEST);
});
