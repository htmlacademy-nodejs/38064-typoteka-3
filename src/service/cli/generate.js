'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {ID_LENGTH, ExitCode} = require(`../../utils/const`);
const {
  getRandomInt,
  shuffleArray,
} = require(`../../utils/common`);


const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const POST_MONTH_RANGE = 3;
const FILE_NAME = `mocks.json`;
const MAX_COMMENT_COUNT = 5;

const ContentFile = {
  TITLES: `./data/titles.txt`,
  SENTENCES: `./data/sentences.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`,
};

const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

/**
 * @return {string} в формате ISO
 */
const getPostDate = () => {
  const ago = new Date();
  ago.setMonth(ago.getMonth() - POST_MONTH_RANGE);
  const now = Date.now();
  const randomTimeInMSeconds = new Date(getRandomInt(ago.getTime(), now));

  return new Date(randomTimeInMSeconds).toJSON();
};

/**
 * @param {string[]} sentences
 * @return {Comment[]}
 */
const generateComments = (sentences) => {
  const count = getRandomInt(1, MAX_COMMENT_COUNT);
  return Array(count).fill(null).map(() => ({
    id: nanoid(ID_LENGTH),
    text: shuffleArray(sentences.slice()).slice(0, getRandomInt(1, sentences.length)).join(` `),
  }));
};

/**
 * @param {number} count
 * @param {string[]} titles
 * @param {string[]} sentences
 * @param {string[]} categories
 * @param {string[]} comments
 * @return {Article[]}
 */
const generatePosts = (count = DEFAULT_COUNT, titles, sentences, categories, comments) => {
  return Array(count).fill(null).map(() => {
    const announceSentenceCount = getRandomInt(AnnounceRestrict.MIN, AnnounceRestrict.MAX);
    const fullTextSentenceCount = getRandomInt(1, sentences.length);
    const categoriesCount = getRandomInt(1, categories.length);

    return {
      id: nanoid(ID_LENGTH),
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffleArray(sentences).slice(0, announceSentenceCount).join(` `),
      fullText: shuffleArray(sentences).slice(0, fullTextSentenceCount).join(` `),
      categories: shuffleArray(categories).slice(0, categoriesCount),
      createdDate: getPostDate(),
      comments: generateComments(comments),
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
  const [titles, sentences, categories, comments] = await Promise.all([
    readContent(ContentFile.TITLES),
    readContent(ContentFile.SENTENCES),
    readContent(ContentFile.CATEGORIES),
    readContent(ContentFile.COMMENTS),
  ]);

  const [count] = args;
  const countPost = Number.isInteger(+count) && (+count > 0) ? +count : DEFAULT_COUNT;

  if (countPost > MAX_COUNT) {
    console.error(chalk.red(`Posts number must not exceed ${MAX_COUNT}`));
    process.exit(ExitCode.ERROR);
  }

  const content = JSON.stringify(generatePosts(countPost, titles, sentences, categories, comments));

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
 * @typedef {Object} Comment
 * @property {string} id
 * @property {string} text
 */

/**
 * @typedef {Object} LocalComment
 * @property {string} text
 */

/**
 * @typedef {Object} Article
 * @property {string} id
 * @property {string} title
 * @property {string} announce
 * @property {string} fullText
 * @property {string[]} categories
 * @property {string} createdDate
 * @property {Comment[]} comments
 */

/**
 * @typedef {Object} LocalPost
 * @property {string} title
 * @property {string} announce
 * @property {string} fullText
 * @property {string[]} categories
 * @property {string} createdDate
 */
