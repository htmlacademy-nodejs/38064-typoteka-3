'use strict';

const {highlightInBold} = require(`./highlight-in-bold`);


describe(`The function works correctly`, () => {
  test(`This correctly wraps all words in tags, keeping case`, () => {
    const MOCK = {
      text: `Как начать программировать. Начать и не закончить на пол пути.`,
      query: `начать`,
    };
    const parsedString = highlightInBold(MOCK.text, MOCK.query);

    return expect(parsedString).toBe(`Как <b>начать</b> программировать. <b>Начать</b> и не закончить на пол пути.`);
  });

  test(`This correctly wraps parts of a words in tags`, () => {
    const MOCK = {
      text: `Дураки ждут счастливый день, но каждый день удачный для трудолюбивого человека.`,
      query: `труд`,
    };
    const parsedString = highlightInBold(MOCK.text, MOCK.query);

    return expect(parsedString).toBe(`Дураки ждут счастливый день, но каждый день удачный для <b>труд</b>олюбивого человека.`);
  });

  test(`This correctly wraps in text with different characters and numbers`, () => {
    const MOCK = {
      text: `Тексты sometimes бывают {очен$} сложные! Не так ли? Например, если (условие) вдруг текст будет описывать массив[текста] со сложн$й стр#кт№рой, то *?:%;№"! что получится на выходе. $текст$. текс.`,
      query: `текст`,
    };
    const parsedString = highlightInBold(MOCK.text, MOCK.query);

    return expect(parsedString).toBe(`<b>Текст</b>ы sometimes бывают {очен$} сложные! Не так ли? Например, если (условие) вдруг <b>текст</b> будет описывать массив[<b>текст</b>а] со сложн$й стр#кт№рой, то *?:%;№"! что получится на выходе. $<b>текст</b>$. текс.`);
  });

  test(`This doesn't wrap words if there are no occurrences`, () => {
    const MOCK = {
      text: `Текст в котором нет вхождений искомого слова.`,
      query: `тест`,
    };
    const parsedString = highlightInBold(MOCK.text, MOCK.query);

    return expect(parsedString).toBe(`Текст в котором нет вхождений искомого слова.`);
  });
});
