'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {ExitCode} = require(`../../utils/const`);
const {
  getRandomInt,
  shuffleArray,
} = require(`../../utils/common`);


const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const POST_MONTH_RANGE = 3;
const FILE_NAME = `mocks.json`;

const ContentFile = {
  TITLES: `./data/titles.txt`,
  SENTENCES: `./data/sentences.txt`,
  CATEGORIES: `./data/categories.txt`,
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
 * @param {string[]} titles
 * @param {string[]} sentences
 * @param {string[]} categories
 * @return {Post[]}
 */
const generatePosts = (count = DEFAULT_COUNT, titles, sentences, categories) => {
  return Array(count).fill(null).map(() => {
    const announceSentenceCount = getRandomInt(AnnounceRestrict.MIN, AnnounceRestrict.MAX);
    const fullTextSentenceCount = getRandomInt(1, sentences.length);
    const categoriesCount = getRandomInt(1, categories.length);

    return {
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffleArray(sentences).slice(0, announceSentenceCount).join(` `),
      fullText: shuffleArray(sentences).slice(0, fullTextSentenceCount),
      category: shuffleArray(categories).slice(0, categoriesCount),
      createdDate: getPostDate(Date.now()),
    };
  });
};

/**
 * @param {string} filePath
 * @return {Promise<string[]>}
 */
const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

/**
 * @param {string[]} args
 */
const run = async (args) => {
  const [titles, sentences, categories] = await Promise.all([
    readContent(ContentFile.TITLES),
    readContent(ContentFile.SENTENCES),
    readContent(ContentFile.CATEGORIES),
  ]);

  const [count] = args;
  const countPost = Number.isInteger(+count) && (+count > 0) ? +count : DEFAULT_COUNT;

  if (countPost > MAX_COUNT) {
    console.error(chalk.red(`Posts number must not exceed ${MAX_COUNT}`));
    process.exit(ExitCode.ERROR);
  }

  const content = JSON.stringify(generatePosts(countPost, titles, sentences, categories));

  try {
    await fs.writeFile(FILE_NAME, content, `utf-8`);
    console.info(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file...`));
    console.error(err);
    process.exit(ExitCode.ERROR);
  }
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
 * @property {string} createdDate
 */
