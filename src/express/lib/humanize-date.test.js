'use strict';

const {humanizeDate} = require(`./humanize-date`);


describe(`The function works correctly`, () => {
  test(`This correctly formats the date using the 'DD.MM.YYYY, HH:mm' template`, () => {
    const MOCK = `2020-12-09T14:51:50.250Z`;
    const formattedDate = humanizeDate(MOCK);

    return expect(formattedDate).toBe(`09.12.2020, 17:51`);
  });

  test(`This should return empty string if the date is invalid`, () => {
    const MOCK = `Некорректная строка`;
    const formattedDate = humanizeDate(MOCK);

    return expect(formattedDate).toBe(``);
  });

  test(`This should formats the date using the 'DD.MM.YYYY' template if withoutTime is true`, () => {
    const MOCK = `2020-12-09T14:51:50.250Z`;
    const formattedDate = humanizeDate(MOCK, true);

    return expect(formattedDate).toBe(`09.12.2020`);
  });
});
