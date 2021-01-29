'use strict';

const escapeRegExp = require(`./escape-reg-exp`);


test(`Correctly converts a string to a regExp string`, () => {
  const MOCK = `Строка для /$поиска/\!@#$%^&*()[]{}`;
  const regExp = escapeRegExp(MOCK);

  return expect(regExp).toBe(`Строка для /\\$поиска/!@#\\$%\\^&\\*\\(\\)\\[\\]\\{\\}`);
});
