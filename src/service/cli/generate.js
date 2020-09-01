'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`);
const {ExitCode} = require(`../utils/const`);
const {
  getRandomInt,
  shuffleArray,
} = require(`../utils/common`);


const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const POST_MONTH_RANGE = 3;
const FILE_NAME = `mocks.json`;

const Data = {
  TITLES: [
    `Ёлки. История деревьев`,
    `Как перестать беспокоиться и начать жить`,
    `Как достигнуть успеха не вставая с кресла`,
    `Обзор новейшего смартфона`,
    `Лучшие рок-музыканты 20-века`,
    `Как начать программировать`,
    `Учим HTML и CSS`,
    `Что такое золотое сечение`,
    `Как собрать камни бесконечности`,
    `Борьба с прокрастинацией`,
    `Рок — это протест`,
    `Самый лучший музыкальный альбом этого года`,
  ],
  ANNOUNCES: [
    `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    `Первая большая ёлка была установлена только в 1938 году.`,
    `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    `Собрать камни бесконечности легко, если вы прирожденный герой.`,
    `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    `Программировать не настолько сложно, как об этом говорят.`,
    `Простые ежедневные упражнения помогут достичь успеха.`,
    `Это один из лучших рок-музыкантов.`,
    `Он написал больше 30 хитов.`,
    `Из под его пера вышло 8 платиновых альбомов.`,
    `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    `Достичь успеха помогут ежедневные повторения.`,
    `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    `Как начать действовать? Для начала просто соберитесь.`,
    `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
    `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
  ],
  CATEGORIES: [
    `Деревья`,
    `За жизнь`,
    `Без рамки`,
    `Разное`,
    `IT`,
    `Музыка`,
    `Кино`,
    `Программирование`,
    `Железо`,
  ],
};

const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

/**
 * @param {number} number
 * @return {string}
 */
const formatToTwoDigits = (number) => {
  return `${number < 10 ? `0` : ``}${number}`;
};

/**
 * @param {number} date
 * @return {string}
 */
const getPostDate = (date) => {
  const ago = new Date(date);
  ago.setMonth(ago.getMonth() - POST_MONTH_RANGE);
  const randomDate = new Date(getRandomInt(ago.getTime(), date));
  const year = randomDate.getFullYear();
  const month = formatToTwoDigits(randomDate.getMonth() + 1);
  const day = formatToTwoDigits(randomDate.getDay());
  const hours = formatToTwoDigits(randomDate.getHours());
  const minutes = formatToTwoDigits(randomDate.getMinutes());
  const seconds = formatToTwoDigits(randomDate.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * @param {number} count
 * @return {Post[]}
 */
const generatePosts = (count = DEFAULT_COUNT) => {
  return Array(count).fill(null).map(() => {
    const announceSentenceCount = getRandomInt(AnnounceRestrict.MIN, AnnounceRestrict.MAX);
    const fullTextSentenceCount = getRandomInt(1, Data.ANNOUNCES.length);
    const categoriesCount = getRandomInt(1, Data.CATEGORIES.length);

    return {
      title: Data.TITLES[getRandomInt(0, Data.TITLES.length - 1)],
      announce: shuffleArray(Data.ANNOUNCES).slice(0, announceSentenceCount).join(` `),
      fullText: shuffleArray(Data.ANNOUNCES).slice(0, fullTextSentenceCount),
      category: shuffleArray(Data.CATEGORIES).slice(0, categoriesCount),
      createdDate: getPostDate(Date.now()),
    };
  });
};

/**
 * @param {string[]} args
 */
const run = (args) => {
  const [count] = args;
  const countPost = Number.isInteger(+count) && (+count > 0) ? +count : DEFAULT_COUNT;

  if (countPost > MAX_COUNT) {
    console.error(chalk.red(`Posts number must not exceed ${MAX_COUNT}`));
    process.exit(ExitCode.ERROR);
  }

  const content = JSON.stringify(generatePosts(countPost));

  fs.writeFile(FILE_NAME, content, `utf-8`, (err) => {
    if (err) {
      console.error(chalk.red(`Can't write data to file...`));
      console.error(err);
      process.exit(ExitCode.ERROR);
    }

    console.info(chalk.green(`Operation success. File created.`));
  });
};


module.exports = {
  name: `--generate`,
  run,
};


/**
 * @typedef {Object} Post
 * @property {string} title
 * @property {string} announce
 * @property {string} fullText
 * @property {string[]} сategory
 * @property {number} createdDate
 */
