'use strict';

const express = require(`express`);
const request = require(`supertest`);
const initArticlesController = require(`./articles`);
const {HttpCode} = require(`../../utils/const`);
const {ArticleService, CommentService} = require(`../data-service`);
const mockData = require(`./articles.e2e.test.mock.json`);


/**
 * @return {Express}
 */
const createAPI = () => {
  const app = express();
  app.use(express.json());
  const cloneData = JSON.parse(JSON.stringify(mockData));
  initArticlesController(app, new ArticleService(cloneData), new CommentService());
  return app;
};


describe(`API returns articles`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 10 articles`, () => expect(response.body.length).toBe(10));

  test(`First article's id is "AcxzdU"`, () => expect(response.body[0].id).toBe(`AcxzdU`));
});


describe(`API returns an article with given id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/o2INMp`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Как достигнуть успеха не вставая с кресла"`, () => expect(response.body.title)
    .toBe(`Как достигнуть успеха не вставая с кресла`));
});

test(`API returns code 404 if there is no article with given id`, () => {
  const app = createAPI();

  return request(app)
    .get(`/articles/NO_EXIST`)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API creates an article if data is valid`, () => {
  const app = createAPI();
  let response;

  /**
   * @type {LocalArticle} */
  const newArticle = {
    title: `Новый валидный пост, который должен быть с заголовком длинной не менее 30 символов`,
    announcement: `Создается только для проверки.`,
    fullText: `Тестовый пост, который должен быть успешно создан по итогу тестов`,
    categories: [`Тестовая категория`, `IT`, `Деревья`],
    createdDate: `2020-11-05T00:00:00.000Z`,
  };

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns the created article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`The articles number has changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(11))
  );
});

test(`API refuses to create an article if data is invalid, and returns status code 400`, () => {
  const app = createAPI();

  const badArticle = {
    title: `Невалидный пост`,
  };

  return request(app)
    .post(`/articles`)
    .send(badArticle)
    .expect(HttpCode.BAD_REQUEST);
});


describe(`API changes existent article`, () => {
  const app = createAPI();
  let response;

  /**
   * @type {LocalArticle}
   */
  const newArticle = {
    title: `Лучшие рок-музыканты 20-века и 21-века`,
    announcement: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения.`,
    fullText: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Программировать не настолько сложно, как об этом говорят. Собрать камни бесконечности легко, если вы прирожденный герой. Как начать действовать? Для начала просто соберитесь. Из под его пера вышло 8 платиновых альбомов. Ёлки — это не просто красивое дерево. Это прочная древесина. Новое описание для новой книги. Какая красота! Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего.`,
    categories: [`Разное`, `Железо`, `Музыка`, `За жизнь`, `Деревья`, `Программирование`, `IT`],
  };

  beforeAll(async () => {
    response = await request(app).put(`/articles/vLwS8T`).send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/vLwS8T`)
    .expect((res) => expect(res.body.title).toBe(`Лучшие рок-музыканты 20-века и 21-века`))
  );
});

test(`API returns status code 400 if data is not valid`, () => {
  const app = createAPI();

  const badArticle = {
    title: 0,
  };

  return request(app)
    .put(`/articles/vLwS8T`)
    .send(badArticle)
    .expect(HttpCode.BAD_REQUEST);
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  /**
   * @type {LocalArticle}
   */
  const newArticle = {
    title: `Лучшие рок-музыканты 20-века и 21-века`,
    announcement: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения.`,
    fullText: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Программировать не настолько сложно, как об этом говорят. Собрать камни бесконечности легко, если вы прирожденный герой. Как начать действовать? Для начала просто соберитесь. Из под его пера вышло 8 платиновых альбомов. Ёлки — это не просто красивое дерево. Это прочная древесина. Новое описание для новой книги. Какая красота! Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Первая большая ёлка была установлена только в 1938 году.`,
    categories: [`Разное`, `Железо`, `Музыка`, `За жизнь`, `Деревья`, `Программирование`, `IT`],
    createdDate: `2020-09-02 01:46:07`,
  };

  return request(app)
    .put(`/articles/NO_EXIST`)
    .send(newArticle)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API correctly deletes an article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/oHIfsh`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`oHIfsh`));

  test(`Article count is 9 after delete`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(9))
  );
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NO_EXIST`)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/8qa-v8/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list with 5 comments`, () => expect(response.body.length).toBe(5));

  test(`First comment's id is "VlaiCe"`, () => expect(response.body[0].id).toBe(`VlaiCe`));
});


describe(`API creates a comment if data is valid`, () => {
  const app = createAPI();
  let response;

  /** @type {LocalComment} */
  const newComment = {
    text: `Новый тестовый комментарий`,
  };

  beforeAll(async () => {
    response = await request(app).post(`/articles/x5i_E8/comments`).send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns created comment`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/x5i_E8/comments`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
  const app = createAPI();

  const badComment = {};

  return request(app)
    .post(`/articles/x5i_E8/comments`)
    .send(badComment)
    .expect(HttpCode.BAD_REQUEST);
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();

  /** @type {LocalComment} */
  const newComment = {
    text: `Новый тестовый комментарий`,
  };

  return request(app)
    .post(`/articles/NO_EXIST/comments`)
    .send(newComment)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API correctly deletes a comment`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/oHIfsh/comments/gBmup4`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted comment`, () => expect(response.body.id).toBe(`gBmup4`));

  test(`Comments number after delete is 3`, () => request(app)
    .get(`/articles/oHIfsh/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/oHIfsh/comments/NO_EXIST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NO_EXIST/comments/gBmup4`)
    .expect(HttpCode.NOT_FOUND);
});
